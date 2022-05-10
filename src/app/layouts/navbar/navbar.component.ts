import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/reducers/auth.reducer';
import * as AuthReducers from '../../store/reducers/auth.reducer'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profileImg: string = ''
  fullname: string = ''
  user: any 

  constructor(private store: Store<AuthState>, private router: Router) { }

  ngOnInit(): void {
    let onBoardedUser = localStorage.getItem('Authenticated User')
    this.user = JSON.parse(onBoardedUser as string) 
    console.log(this.user)
    this.profileImg = this.user.profile_image_url
    this.fullname = `${this.user.first_name} ${this.user.last_name}`
    console.log(this.profileImg, this.fullname)
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
