import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get(`${environment.url}/user-notes`);
  }

  createUser(payload) {
    return this.http.post(`${environment.url}/user-notes`, payload);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.url}/user-notes/${id}`);
  }

  updateUser(id, body): Observable<any> {
    return this.http.put(`${environment.url}/user-notes/${id}`, body);
  }
}
