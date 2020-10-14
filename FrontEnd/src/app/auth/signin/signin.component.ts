import { isLoggedInSelector } from './../state/auth.selector';
// import { isLoggedInSelector } from './../state/auth.reducer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as AuthAction from '../state/auth.action';
import { Router } from '@angular/router';
import { IAppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @ViewChild('nav', { static: true }) nav: NgbNav;
  active = 1;
  isLogin = true;

  constructor(private store: Store<IAppState>, private router: Router) {
    this.store.select(isLoggedInSelector).subscribe((res) => {
      if (res) {
        this.router.navigate(['user', 'user-list']);
      }
    });
  }

  ngOnInit(): void {
    // const val: string = localStorage.getItem('auth');
    // if (val) {
    //   this.store.dispatch(
    //     AuthAction.submitFormSuccess({ token: val, user: {}, isLoggedIn: true })
    //   );
    // }
  }

  public tabChange({ nextId, activeId }): void {
    if (nextId === 2 && activeId === 1) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  submittedForm($event) {
    if (this.isLogin) {
      this.store.dispatch(AuthAction.signInForm({ userForm: $event }));
    } else {
      this.store.dispatch(AuthAction.submitSignup({ form: $event }));
    }
  }

  public navigateToSignupTab($event): void {
    if ($event) {
      this.nav.activeId = 2;
    }
  }
}
