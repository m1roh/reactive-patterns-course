import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import * as _ from 'lodash';
import {CoursesService} from '../services/courses-service';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  lessons: Lesson[];

  constructor(private coursesService: CoursesService,
              private db: AngularFireDatabase,
              private route: ActivatedRoute) {


    route.params
      .subscribe(params => {

        const courseUrl = params['id'];

        this.coursesService.findCourseByUrl(courseUrl)
          .subscribe(data => {
            this.course = data;

            this.coursesService.findLessonsForCourse(courseUrl)
              .subscribe(lessons => this.lessons = lessons);
          });
      });
  }

  ngOnInit() {

  }

}
