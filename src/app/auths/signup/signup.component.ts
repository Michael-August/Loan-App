import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service/auth-service.service';
import { IUserSignUp } from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    pin: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
    referral_code: new FormControl('')
  })

  constructor(private userSignUp: AuthService) { }

  ngOnInit(): void {
  }

  get phone() {
    return this.signUpForm.controls['phone_number']
  }

  get pin() {
    return this.signUpForm.controls['pin']
  }

  get referral_code() {
    return this.signUpForm.controls['referral_code']
  }

  getCountry(code: any) {
    return code.dialCode
  }

  getNumber(event: any) {
    console.log(event);
    this.phone.setValue(event)
  }

  signUp() {
    let payLoad: IUserSignUp = {
      ...this.signUpForm.value,
      referral_code: this.referral_code.value !== '' ? this.referral_code.value : '000111',
    }
    this.userSignUp.signUpUser(payLoad).subscribe(res => {
      console.log(res, payLoad);
    })
    console.log(payLoad);
  }

}
