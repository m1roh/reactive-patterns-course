import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../shared/model/lesson';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;
  currentPageNumber = 1;
  private subject = new BehaviorSubject<Lesson[]>([]);
  lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();
  private courseId: number;


  constructor(private http: HttpClient) {
    console.log('LessonsPagerService instance created ..');
  }


  loadFirstPage(courseId: number): Observable<any> {
    this.courseId = courseId;
    this.currentPageNumber = 1;
    return this.loadPage(this.currentPageNumber);
  }

  previous(): Observable<any> {
    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;
    }
    return this.loadPage(this.currentPageNumber);
  }

  next(): Observable<any> {
    this.currentPageNumber += 1;
    return this.loadPage(this.currentPageNumber);
  }


  loadPage(pageNumber: number): Observable<any> {

    const params = new HttpParams()
      .set('courseId', this.courseId.toString())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', LessonsPagerService.PAGE_SIZE.toString());

    return this.http.get('/api/lessons', {
      params
    })
      .map(res => res['payload'])
      .do(lessons => this.subject.next(lessons))
      .publishLast().refCount();
  }

}
