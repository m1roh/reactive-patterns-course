import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private router: Router) {


  }

  ngOnInit() {

    this.loading$ = this.router.events
      .map(event => !(event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError));


  }

}
