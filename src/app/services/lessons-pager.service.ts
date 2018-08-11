import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Lesson} from '../shared/model/lesson';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsPagerService {

  private static readonly PAGE_SIZE = 2;

  private subject = new BehaviorSubject<Lesson[]>([]);
  private courseId: number;

  lessonsPage$: Observable<Lesson[]> = this.subject.asObservable();

  currentPageNumber = 1;

  constructor(private http: HttpClient) { }

  loadFirstPage(courseId: number) {

    this.courseId = courseId;
    this.currentPageNumber = 1;
    this.loadPage(this.currentPageNumber);

  }

  nextPage() {
    this.currentPageNumber += 1;
    this.loadPage(this.currentPageNumber);
  }

  previousPage() {
    if (this.currentPageNumber - 1 >= 1) {
      this.currentPageNumber -= 1;
      this.loadPage(this.currentPageNumber);
    }
  }

  loadPage(pageNumber: number) {
    const params = new HttpParams()
      .set('courseId', this.courseId.toString())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', LessonsPagerService.PAGE_SIZE.toString());

    this.http.get('/api/lessons', {
      params
    })
      .map(res => res['payload'] as Lesson[])
      .subscribe(
        lessons => this.subject.next(lessons)
      );
  }
}
