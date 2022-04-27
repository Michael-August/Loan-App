import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogInUser, IUserSignUp } from 'src/app/auths/auth.model';
import { BASE_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  signUpUser(user: IUserSignUp) {
    return this.http.post(`${BASE_URL}/register-with-phone`, user)
  }

  logInUser(user: ILogInUser) {
    return this.http.post(`${BASE_URL}/login`, user)
  }

}
