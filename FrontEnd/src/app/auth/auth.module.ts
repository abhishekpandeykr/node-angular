import { AuthEffect } from './state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import authReducer from './state/auth.reducer';

@NgModule({
  declarations: [SigninComponent, AuthFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffect]),
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthModule {}
