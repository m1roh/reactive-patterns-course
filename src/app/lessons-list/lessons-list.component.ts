import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent {

  @Input()
  lessons: Lesson[];

  @Output()
  selected = new EventEmitter<Lesson>();


  select(lesson: Lesson) {
    this.selected.next(lesson);
  }

}
