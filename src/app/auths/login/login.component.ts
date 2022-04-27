import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service/auth-service.service';


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
  
  constructor(private route: Router, private logInUser: AuthService) { }

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

    // this.store.dispatch(AuthActions.loginPage(payLoad))
    this.logInUser.logInUser(payLoad).subscribe((res: any) => {
      console.log(res.data);
      let token = res.data.access_token
      localStorage.setItem("Token", token)
      this.route.navigate(['/Authenticated/dashboard'])
    })
  }

}
