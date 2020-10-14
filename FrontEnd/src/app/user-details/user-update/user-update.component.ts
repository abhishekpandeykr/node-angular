import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserProps } from '../state/user-detail.action';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  @Input() currentSelectedUser: IUserProps;
  @Output() submmitedValue: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() deleteUser: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  setForm() {
    this.userForm = this.fb.group({
      _id: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
      notes: [null, Validators.required],
      status: ['active'],
      list: [null],
      createdAt: [null],
      updatedAt: [null],
    });
  }

  ngOnChanges(change: SimpleChanges): void {
    console.log(change);
    this.setForm();
    if (change && change.currentSelectedUser) {
      const formKeys = Object.keys(this.userForm.controls);
      if (this.currentSelectedUser) {
        Object.keys(this.currentSelectedUser).forEach((val) => {
          if (formKeys.includes(val)) {
            this.userForm.controls[val].setValue(this.currentSelectedUser[val]);
          }
        });
      }
    }
  }

  submit(e: FormGroup) {
    const isDirty = this.userForm.dirty;
    if (isDirty) {
      this.submmitedValue.emit(e.value);
    }
  }
}
