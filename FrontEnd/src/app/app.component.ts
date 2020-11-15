import * as AuthAction from './auth/state/auth.action';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IAppState } from './state/app.state';
import { isLoggedInSelector } from './auth/state/auth.selector';
import { Router } from '@angular/router';
declare var localStorage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn;
  constructor(private store: Store<IAppState>, private router: Router) {}

  ngOnInit() {
    this.store.select(isLoggedInSelector).subscribe((res) => {
      if (res) {
        this.isLoggedIn = res;
      }
    });
    const val = localStorage.getItem('isLoggedIn');
    if (!val) {
      this.store.select(isLoggedInSelector).subscribe((res) => {
        if (res) {
          this.isLoggedIn = res;
        }
      });
    } else {
      this.isLoggedIn = val;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
    this.isLoggedIn = false;
    this.store.dispatch(
      AuthAction.submitFormSuccess({ user: {}, token: null, isLoggedIn: false })
    );
  }
}
