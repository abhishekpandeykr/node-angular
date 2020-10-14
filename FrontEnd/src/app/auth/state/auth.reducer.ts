import * as AppState from './../../state/app.state';
import { AuthState } from './auth';
import * as AuthAction from './auth.action';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export interface IAuthState extends AppState.IAppState {
  authState: AuthState;
}

const authReducer = createReducer<AuthState>(
  initialState,
  on(
    AuthAction.submitFormSuccess,
    (state, payload): AuthState => {
      console.log(payload);
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        token: payload.token,
        user: payload.user,
      };
    }
  )
);

export default authReducer;
