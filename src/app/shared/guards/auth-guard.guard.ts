import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    
  }

  canActivate(): any {
    const token = localStorage.getItem("Token")
    if (token) {
      return true
    } else {
      alert("Can't Access this page")
      this.router.navigate(['/'])
    }
  }  
}
