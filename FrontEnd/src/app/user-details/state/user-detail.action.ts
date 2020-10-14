import { IUserDetails } from './user-detail.reducers';
import { createAction, props } from '@ngrx/store';

export interface IUserProps {
  _id?: string;
  name: string;
  notes: string;
  description: string;
}
export const toggleUserList = createAction(
  '[User Detail] Toggle User Details Page'
);

export const clearCurrentSelectedUser = createAction(
  '[User Details] Clear current User Selection'
);

export const setCurrentUser = createAction(
  '[User Detail] Set current User',
  props<{ userDetails: IUserDetails }>()
);

export const createUser = createAction(
  '[User Details] Create User',
  props<{ userProps: IUserProps }>()
);

export const createUserSuccess = createAction(
  '[user Details] Create User Success',
  props<{ props: any }>()
);

export const savingError = createAction(
  '[User Details] Create User Error',
  props()
);

export const getUserDetails = createAction('[User Details] Get User Details');

export const getUserDetailsSuccess = createAction(
  '[User Details] Get User details',
  props<{ userDetails: any }>()
);

export const deleteUser = createAction(
  '[User Details] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User Details] Delete User Success',
  props<{ props: any }>()
);

export const updateUser = createAction(
  '[User Details] Update User',
  props<{ id: string; updatedUser: IUserProps }>()
);

export const updateUserSuccess = createAction(
  '[User Details] Update User Success',
  props<{ updatedUser: IUserProps }>()
);

export const showLoader = createAction(
  '[User Details] Toggle Loader',
  props<{ isVisible: boolean }>()
);
