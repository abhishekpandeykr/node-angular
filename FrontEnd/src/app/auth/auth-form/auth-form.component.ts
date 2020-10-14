import { Mappings } from './../../../assets/placeholderMapping';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  userForm: FormGroup;
  @Input() isLogin: boolean;
  mappings = Mappings;
  @Output() signupPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submittedForm: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });
    if (!this.isLogin) {
      this.setupSignupForm();
    }
  }

  private setupSignupForm() {
    // debugger;
    this.userForm.addControl(
      'firstName',
      new FormControl(null, Validators.required)
    );
    this.userForm.addControl(
      'lastName',
      new FormControl(null, Validators.required)
    );
  }

  private setLoginForm() {}

  navigateToSignup() {}

  // remove
  ngOnDestroy() {
    this.userForm.reset();
    console.log('removed', this.isLogin);
  }

  onSubmit(e: FormGroup) {
    console.log(e, 'form is');
    this.submittedForm.emit(e.value);
  }
}
