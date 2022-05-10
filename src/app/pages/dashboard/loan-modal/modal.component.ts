import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/shared/services/loan-service/loan-service.service';
import { SWEET_ALERT, TIMED_SWEET_ALERT } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  loanGetStarted = new FormGroup({
    loanNegotiation: new FormGroup({
      loan_id: new FormControl('', Validators.required),
      amount: new FormControl(50000, [Validators.required]),
      duration: new FormControl(1, Validators.required)
    }),
    loanPurpose: new FormGroup({
      place_of_work: new FormControl(''),
      salary_payment_date: new FormControl(''),
      purpose: new FormControl('', Validators.required),
      monthly_outstanding: new FormControl('')
    })
  })

  step: number = 1
  showLoader = false

  loanType: any = []
  message: string = ''
  is_avail: boolean = true
  payBack: number = 50000
  payBackPerMonth: number = 50000
  
  constructor(private route: Router, private loanService: LoanService) { }

  ngOnInit(): void {
    this.getLoanType()
  }

  get amount() {
    return (this.loanGetStarted.controls['loanNegotiation'] as FormGroup).controls['amount']
  }

  get tenure() {
    return (this.loanGetStarted.controls['loanNegotiation'] as FormGroup).controls['duration']
  }

  get loan_id() {
    return (this.loanGetStarted.controls['loanNegotiation'] as FormGroup).controls['loan_id']
  }

  get purpose() {
    return (this.loanGetStarted.controls['loanPurpose'] as FormGroup).controls['purpose']
  }

  getLoanType() {
    this.loanService.getLoanTypes().subscribe((res: any) => {
      console.log(res);
      this.loanType = res.data
    })
  }

  checkLoan() {
    let selectedLoan = this.loanType.find((loan: any) => {      
      return loan.id === +this.loan_id.value
    }) 
    console.log(+this.loan_id.value);
    
    if (selectedLoan.is_available === 0) {
      this.is_avail = !this.is_avail
      this.message = "This Loan type is not available yet please select another loan type"
    } else {
      this.is_avail === true
      this.message = ''
    }
  }

  loanPayBack() {
    let tenure = +this.tenure.value
    let interest = 5 / 100
    this.payBack = (this.amount.value * interest) + this.amount.value
    this.payBackPerMonth = this.payBack / tenure
  }

  closeMyModal() {
    let element: any = document.getElementById('close')
    element.click()
  }

  getStarted() {
    this.step++
    console.log(this.step);
    
    if (this.step === 3) {
      let payLoad = {
        ...this.loanGetStarted.get('loanNegotiation')?.value,
        ...this.loanGetStarted.get('loanPurpose')?.value
      }
      if (this.loanGetStarted.valid) {
        console.log(payLoad);
        this.showLoader = true
        this.loanService.applyForLoan(payLoad).subscribe((res: any) => {
          TIMED_SWEET_ALERT('Successful', 'Loan applied Successfully', 'success')
          this.closeMyModal()
          this.route.navigate(['/Authenticated/dashboard'])
          console.log(res)
        }, err => {
          console.log(err);
          if (err.error.code === "08") {
            SWEET_ALERT('Unable to apply for Loan', 'Please complete our KYC section to be eligible for loan.', 'error')
            this.closeMyModal()
            this.route.navigate(['/Authenticated/dashboard/KYC'])
          }
        }).add(() => this.showLoader = false)
      } else {
        SWEET_ALERT('Error', 'Please fill the form correctly','error')
        this.step -= 2
      }
      return 
    } 
  }
}
