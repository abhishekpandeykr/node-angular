import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './../../services/auth.service';
import * as AuthAction from './auth.action';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffect {
  constructor(private authService: AuthService, private actions: Actions) {}

  SignInEffect$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthAction.signInForm),
      mergeMap((payload) =>
        this.authService
          .signIn(payload.userForm)
          .pipe(
            map((res: any) =>
              AuthAction.submitFormSuccess({
                user: res,
                token: res.token,
                isLoggedIn: true,
              })
            )
          )
      )
    );
  });

  SignUpEffect$ = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthAction.submitSignup)
      // switchMap((payload) => {
      //   this.authService
      //     .signUp(payload.form)
      //     .pipe(
      //       map((res: any) =>
      //         AuthAction.submitFormSuccess({ user: res, token: res.token })
      //       )
      //     );
      // })
    );
  });
}
