import * as AppState from './../../state/app.state';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  State,
} from '@ngrx/store';
import * as UserDetailActions from './user-detail.action';

// Extending this for lazy load features

export interface IAppState extends AppState.IAppState {
  userDetails: IUserDetails;
}
export interface IUserDetails {
  showAllUserDetails: boolean;
  allUsers: any;
  userDetails: any;
  currentUser: any;
  error: any;
  deleted: boolean;
  isLoading: boolean;
}

const initialState: IUserDetails = {
  showAllUserDetails: true,
  allUsers: [],
  userDetails: null,
  currentUser: null,
  error: null,
  deleted: false,
  isLoading: false,
};

const getuserDetailsSelector = createFeatureSelector<IUserDetails>(
  'userDetails'
);

export const getShowUserDetails = createSelector(
  getuserDetailsSelector,
  (state) => state.showAllUserDetails
);

export const createdUserDetails = createSelector(
  getuserDetailsSelector,
  (state) => state.currentUser
);

export const getUserLists = createSelector(
  getuserDetailsSelector,
  (state) => state.allUsers
);

export const isDeleted = createSelector(
  getuserDetailsSelector,
  (state) => state.deleted
);

export const isLoadingSelector = createSelector(
  getuserDetailsSelector,
  (state) => state.isLoading
);

export const userDetailsReducer = createReducer<IUserDetails>(
  initialState,
  on(
    UserDetailActions.toggleUserList,
    (state): IUserDetails => {
      return {
        ...state,
        showAllUserDetails: !state.showAllUserDetails,
      };
    }
  ),
  on(
    UserDetailActions.createUserSuccess,
    (state, action): IUserDetails => {
      return {
        ...state,
        isLoading: false,
        currentUser: action.props,
        allUsers: [...state.allUsers, action.props.data],
      };
    }
  ),
  on(
    UserDetailActions.getUserDetailsSuccess,
    (state, action): IUserDetails => {
      return {
        ...state,
        isLoading: false,
        allUsers: action.userDetails,
      };
    }
  ),

  on(UserDetailActions.savingError, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action,
    };
  }),

  on(
    UserDetailActions.deleteUserSuccess,
    (state, action): IUserDetails => {
      const newState = state.allUsers.filter(
        (ele) => ele._id !== action.props.id
      );
      let deleted = false;
      if (action.props && action.props.id) {
        deleted = true;
      } else {
        deleted = false;
      }
      return {
        ...state,
        isLoading: false,
        allUsers: newState,
        deleted: deleted,
      };
    }
  ),

  on(
    UserDetailActions.updateUserSuccess,
    (state, action): IUserDetails => {
      const newDataList = state.allUsers.map((ele) => {
        return ele._id === action.updatedUser._id ? action.updatedUser : ele;
      });
      console.log('data', newDataList);
      return {
        ...state,
        isLoading: false,
        allUsers: newDataList,
      };
    }
  ),

  on(UserDetailActions.showLoader, (state, action) => {
    console.log(action, 'action');
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  })
);
