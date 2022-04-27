import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { IndexComponent } from '../index.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { ModalComponent } from './loan-modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './KYC-form/form-not-used/form.component';
import { ProgressComponent } from 'src/app/progress.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.guard';
import { KycFormComponent } from './KYC-form/kyc-form/kyc-form.component';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'transactions', component: TransactionsComponent },
  { path: 'KYC', component: KycFormComponent },
]

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionsComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    ModalComponent,
    FormComponent,
    ProgressComponent,
    KycFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
