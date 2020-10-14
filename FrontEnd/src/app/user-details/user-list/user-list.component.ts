import { IUserProps } from './../state/user-detail.action';
import {
  createdUserDetails,
  getShowUserDetails,
  getUserLists,
  IAppState,
  isDeleted,
  isLoadingSelector,
} from './../state/user-detail.reducers';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserDetailAction from '../state/user-detail.action';
import { Observable } from 'rxjs';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  checked: boolean;
  users$: Observable<any>;
  isTableVisible: boolean;
  currentSelectedUser: IUserProps;
  @ViewChild(UserUpdateComponent, { static: false })
  userDetailForm: UserUpdateComponent;
  showLoader$: Observable<boolean>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UserDetailAction.showLoader({ isVisible: true }));
    this.store.dispatch(UserDetailAction.getUserDetails());
    this.store.select(getShowUserDetails).subscribe((res) => {
      this.checked = res;
    });
    this.store.select(createdUserDetails).subscribe((res) => {
      if (res && res.data) {
        this.isTableVisible = false;
        this.userDetailForm.userForm.reset();
      }
    });
    this.users$ = this.store.select(getUserLists);
    this.store.select(isDeleted).subscribe((res) => {
      if (res) {
        // this.userDetailForm.userForm.setValue({});
        this.userDetailForm.userForm.reset();
        this.isTableVisible = false;
      }
    });
    this.showLoader$ = this.store.select(isLoadingSelector);
  }

  listChange($) {
    this.store.dispatch(UserDetailAction.showLoader({ isVisible: true }));
    this.store.dispatch(UserDetailAction.toggleUserList());
  }

  createUser() {
    this.currentSelectedUser = null;
    if (this.userDetailForm && this.userDetailForm.userForm) {
      this.userDetailForm.userForm.reset();
    }
    this.isTableVisible = true;
  }

  ngAfterViewChecked() {
    // this.userDetailForm.userForm.reset();
  }
  currentUser(user) {
    this.isTableVisible = true;
    this.currentSelectedUser = user;
  }

  public submmitedValue($event) {
    const id = $event._id;
    this.store.dispatch(UserDetailAction.showLoader({ isVisible: true }));
    if (id) {
      this.store.dispatch(
        UserDetailAction.updateUser({ id, updatedUser: $event })
      );
    } else {
      this.store.dispatch(UserDetailAction.createUser({ userProps: $event }));
    }
  }

  public deleteUser($event) {
    this.store.dispatch(UserDetailAction.showLoader({ isVisible: true }));
    this.store.dispatch(UserDetailAction.deleteUser({ id: $event }));
  }
}
