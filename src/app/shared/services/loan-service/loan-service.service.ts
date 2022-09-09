import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoanTypes () {
    return this.http.get(`${environment.BASE_URL}/loan`)
  }

  applyForLoan(loanInfo: any) {
    return this.http.post(`${environment.BASE_URL}/loan/apply`, loanInfo)
  }

}
