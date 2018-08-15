import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';


@Injectable()
export class CoursesHttpService {

  constructor(private http: HttpClient) {
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get(`/api/courses/${courseId}`)
      .map(res => res as Course);
  }


  findLessonDetailById(lessonId): Observable<Lesson> {
    return this.http.get(`/api/lessons/${lessonId}`)
      .map(res => res as Lesson);
  }
}
