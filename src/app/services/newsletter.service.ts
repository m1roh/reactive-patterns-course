import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsletterService {


  constructor(private http: HttpClient) {

  }

  subscribeToNewsletter(email: string): Observable<any> {
    return this.http.post('/api/newsletter', {email});
  }

}
