import { Injectable } from '@angular/core';
import { User } from '../shared/model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export const UNKNOWN_USER: User = {
    firstName: 'Unknown'
};


@Injectable()
export class UserService {

    private subject = new BehaviorSubject(UNKNOWN_USER);

    user$: Observable<User> = this.subject.asObservable();

  constructor(private http: HttpClient) {


    }

  login(email: string, password: string): Observable<User> {

    const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

    return this.http.post('/api/login', {email, password}, {headers})
      .map(res => res as User)
            .do(user => console.log(user))
            .do(user => this.subject.next(user))
            .publishLast().refCount();

    }


}
