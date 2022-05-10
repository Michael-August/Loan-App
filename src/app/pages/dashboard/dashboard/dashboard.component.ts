import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general-service/general-service.service';
import { SWEET_ALERT, TIMED_SWEET_ALERT } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = {}
  transactions: any = []
  showLoader: boolean = false

  constructor(private router: Router, private transactionService: GeneralService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('Authenticated User')
    this.user = JSON.parse(user as string)

    this.autoLogOut()
    this.checkBVNVerification()
    this.getTransactions()
  }

  getTransactions() {
    this.showLoader = true
    this.transactionService.getTransactions().subscribe((res: any) => {
      let someItems = res.data
      this.transactions = someItems.slice(0, 7)
      console.log(this.transactions)
    }).add(() => this.showLoader = false)
  }

  checkBVNVerification() {
    if (!this.user.bvn) {
      SWEET_ALERT('BVN Verification', 'Verify your BVN with us', 'warning')
    }
  }

  autoLogOut() {
    if (localStorage.length) {
      setTimeout(() => {
        localStorage.clear()
        TIMED_SWEET_ALERT('Session Expired', 'Your Session just expired, you will need to log in again', 'info')
        this.router.navigate(['/'])
      }, 1000000)
    }
  }

}
