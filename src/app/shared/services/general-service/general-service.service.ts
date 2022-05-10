import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService{

  constructor(private http: HttpClient) { 
    
  }
    
  getTransactions() {
    return this.http.get(`${BASE_URL}/transaction`)
  }

  getUserBankDetails() {
    return this.http.get(`${BASE_URL}/bank-account`)
  }
  
}
