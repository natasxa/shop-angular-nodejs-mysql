import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:1000/users/',
      { responseType: "text" })
  }
  public getUserById(id): Observable<any> {
    return this.http.get('http://localhost:1000/users/' + id,
      { responseType: "text" })
  }
  public login(body): Observable<any> {
    return this.http.post('http://localhost:1000/users/login', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
  public register(body): Observable<any> {
    return this.http.post('http://localhost:1000/users/register', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
}
