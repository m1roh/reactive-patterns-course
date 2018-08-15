import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../shared/model/course';
import { Lesson } from '../shared/model/lesson';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseDetailResolver implements Resolve<[Course, Lesson[]]> {

  constructor(private coursesService: CoursesService) {

  }



  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<[Course, (Lesson[])]> {

    return this.coursesService.findCourseByUrl(route.params['id'])
      .switchMap(
        course => this.coursesService.findLessonsForCourse(course.id)
          .map(lessons => <any>[course, lessons])
      );
  }
}
