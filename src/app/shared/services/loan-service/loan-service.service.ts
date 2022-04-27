import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoanTypes () {
    return this.http.get(`${BASE_URL}/loan`)
  }

  applyForLoan(loanInfo: any) {
    return this.http.post(`${BASE_URL}/loan/apply`, loanInfo)
  }

}
