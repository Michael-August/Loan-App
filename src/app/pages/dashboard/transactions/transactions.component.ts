import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general-service/general-service.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: any = []
  showLoader = false

  constructor(private transactionService: GeneralService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.showLoader = true
    this.transactionService.getTransactions().subscribe((res: any) => {
      console.log(res.data);
      this.transactions = res.data
    }).add(() => this.showLoader = false)
  }

}
