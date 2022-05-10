import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { SharedModule } from '../shared/shared.module';

const authRoute: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoute),
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    SharedModule
  ]
})
export class AuthModule { }
