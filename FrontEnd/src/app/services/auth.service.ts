import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(payload) {
    return this.http.post(`${environment.url}/signup`, payload);
  }

  signIn(payload) {
    return this.http.post(`${environment.url}/signin`, payload);
  }

  isLoggedIn() {
    const val = localStorage.getItem('isLoggedIn');
    console.log('value', val);
    return of(val);
  }
}
