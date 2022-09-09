import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralService{

  constructor(private http: HttpClient) { 
    
  }
    
  getTransactions() {
    return this.http.get(`${environment.BASE_URL}/transaction`)
  }

  getUserBankDetails() {
    return this.http.get(`${environment.BASE_URL}/bank-account`)
  }
  
}
