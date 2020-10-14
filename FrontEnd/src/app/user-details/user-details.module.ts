import { UserDetailEffects } from './state/user-detail.effect';
import { EffectsModule } from '@ngrx/effects';
import { userDetailsReducer } from './state/user-detail.reducers';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('userDetails', userDetailsReducer),
    EffectsModule.forFeature([UserDetailEffects]),
  ],
})
export class UserDetailsModule {}
