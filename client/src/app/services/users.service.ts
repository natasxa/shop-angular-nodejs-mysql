import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    console.log("someone tries to get all users")
    return this.http.get('http://localhost:1000/users/',
      { responseType: "text" })
  }
  public getUserById(id): Observable<any> {
    console.log("someone tries to check user ID")
    return this.http.get('http://localhost:1000/users/' + id,
      { responseType: "text" })
  }
  public login(body): Observable<any> {
    console.log("someone tries to login")
    return this.http.post('http://localhost:1000/users/login', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
  public register(body): Observable<any> {
    console.log("someone tries to register")
    return this.http.post('http://localhost:1000/users/register', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
}
