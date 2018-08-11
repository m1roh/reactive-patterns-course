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


  loadFirstPage(courseId: number) {
    this.courseId = courseId;
    this.currentPageNumber = 1;
    this.loadPage(this.currentPageNumber);
  }

  previous() {
    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;
      this.loadPage(this.currentPageNumber);
    }
  }

  next() {
    this.currentPageNumber += 1;
    this.loadPage(this.currentPageNumber);
  }


  loadPage(pageNumber: number) {
    const params = new HttpParams()
      .set('courseId', this.courseId.toString())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', LessonsPagerService.PAGE_SIZE.toString());
    this.http.get('/api/lessons', {
      params
    })
      .map(res => res['payload'])
      .subscribe(
        lessons => this.subject.next(lessons)
      );
  }

}
