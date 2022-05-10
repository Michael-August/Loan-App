import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth-service/auth-service.service';
import { TIMED_SWEET_ALERT } from 'src/app/shared/utils/helper';
import { AuthState } from 'src/app/store/reducers/auth.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authDetails = new FormGroup({
    username: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  })

  showPassword = false
  setText = 'text'
  setPassword: string = 'password'

  showLoader: boolean = false
  
  constructor(private route: Router, private logInUser: AuthService, private store: Store<AuthState>) { }

  ngOnInit(): void {
  }

  get username() {
    return this.authDetails.controls['username']
  }

  get pin() {
    return this.authDetails.controls['pin']
  }

  getCountry(event: any) {
    console.log(event);
  }

  getNumber(event: any) {
    this.username.setValue(event)
    console.log(this.username.value);
  }

  togglePassword () {
    this.showPassword = !this.showPassword
  }

  login() {
    let payLoad = {
      ...this.authDetails.value,
      device_name: 'Windows 10'
    }
    this.showLoader = true
    this.logInUser.logInUser(payLoad).subscribe((res: any) => {
      console.log(res.data);
      let token = res.data.access_token
      let user = res.data.user
      localStorage.setItem('Authenticated User', JSON.stringify(user))
      localStorage.setItem("Token", token)
      let loggeedIn = localStorage.getItem("Authenticated User")
      let authUser = JSON.parse(loggeedIn as string)
      TIMED_SWEET_ALERT('Successful', `Welcome back ${authUser.first_name}`, 'success')
      this.route.navigate(['/Authenticated/dashboard'])
    }).add(() => this.showLoader = false)
  }

}
