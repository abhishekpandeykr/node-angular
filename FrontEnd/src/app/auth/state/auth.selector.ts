import { AuthState } from './auth';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const authSelector = createFeatureSelector<AuthState>('auth');

export const isLoggedInSelector = createSelector(authSelector, (state) => {
  return state && state.isLoggedIn;
});
