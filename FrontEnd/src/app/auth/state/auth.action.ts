import { IUser } from './auth';
import { createAction, props } from '@ngrx/store';

export const submitSignup = createAction(
  '[Auth] Submit Signup Form',
  props<{ form: IUser }>()
);

export const signInForm = createAction(
  '[Auth] Submit Sign In Form',
  props<{ userForm: IUser }>()
);

export const submitFormSuccess = createAction(
  '[Auth] Singup/Signin Submit Form Success',
  props<{ user: any; token: string; isLoggedIn: boolean }>()
);
