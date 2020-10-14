import { UserDetailsService } from './../../services/user-details.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserDetailsAction from './user-detail.action';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class UserDetailEffects {
  constructor(
    private action$: Actions,
    private userDetailsService: UserDetailsService // private userDetailService: UserDetailsService
  ) {}

  loadUserDetails$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserDetailsAction.getUserDetails),
      mergeMap(() =>
        this.userDetailsService.getUserDetails().pipe(
          map((users: any) =>
            UserDetailsAction.getUserDetailsSuccess({
              userDetails: users.data,
            })
          )
        )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserDetailsAction.createUser),
      mergeMap((payload) =>
        this.userDetailsService.createUser(payload.userProps).pipe(
          map((props) => UserDetailsAction.createUserSuccess({ props })),
          catchError((err) => of(UserDetailsAction.savingError(err)))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserDetailsAction.deleteUser),
      mergeMap((payload) =>
        this.userDetailsService.deleteUser(payload.id).pipe(
          map((props) => UserDetailsAction.deleteUserSuccess({ props })),
          catchError((err) => of(UserDetailsAction.savingError(err)))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserDetailsAction.updateUser),
      mergeMap((payload) =>
        this.userDetailsService
          .updateUser(payload.id, payload.updatedUser)
          .pipe(
            map(
              (props) =>
                UserDetailsAction.updateUserSuccess({
                  updatedUser: props && props.data,
                }),
              catchError((err) => of(UserDetailsAction.savingError(err)))
            )
          )
      )
    );
  });
}
