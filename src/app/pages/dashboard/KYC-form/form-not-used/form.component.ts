import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/shared/services/loan-service/loan-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  step = 1
  personalDetails = true
  contactDetails = false
  employmentDetails = false

  getStartedValues = {}

  loanInfo = new FormGroup({
    personalDetails: new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required])
    }),
    contactDetails: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      country: new FormControl('')
    }),
    employmentDetails: new FormGroup({
      place_of_work: new FormControl('', Validators.required),
      salary_payment_date: new FormControl(''),
      purpose: new FormControl(''),
      monthly_outstanding: new FormControl('')
    })
  })

  constructor(private route: Router, private apply: LoanService) { }

  ngOnInit(): void {
  }

  submitLoanInfo() {
    if (this.loanInfo.controls['personalDetails'].valid) {
      this.step = 2
    }   
    
    if (this.loanInfo.controls['contactDetails'].valid) {
      this.step = 3
    }    
    
    if (this.step == 2) {
      console.log((this.loanInfo.controls['personalDetails'].value));
      this.contactDetails = true
    }

    if (this.step == 3) {
      this.employmentDetails = true
    }

    if (this.loanInfo.controls['employmentDetails'].valid) {
      this.step = 4
      console.log(this.loanInfo);
      let modalValue = localStorage.getItem('Get Started')
      this.getStartedValues = JSON.parse(modalValue as string)

      let payLoad = {
        ...this.getStartedValues,
        ...this.loanInfo.controls['employmentDetails'].value
      }
      console.log(payLoad)
      
      this.apply.applyForLoan(payLoad).subscribe(res => {
        console.log(res)
      })
      this.route.navigate(['/Authenticated/dashboard'])
    }
  }

  previous() {
    this.step = this.step - 1

    if (this.step === 2) {
      this.employmentDetails = false
    }

    if (this.step === 1) {
      this.contactDetails = false
    }
  }

}
