import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewAccountComponent} from 'src/app/account/Component/new-account/new-account.component';
import {LoginComponent} from 'src/app/account/Component/login/login.component';
import {AccountComponent} from 'src/app/account/Component/account/account.component';
import {EmailVerificationComponent} from 'src/app/account/Component/email-verification/email-verification.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HistoryComponent } from './Component/history/history.component';

@NgModule({
  declarations: [
    NewAccountComponent,
    LoginComponent,
    AccountComponent,    
    NewAccountComponent,
    EmailVerificationComponent, 
    HistoryComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:'newaccount', component: NewAccountComponent},
      {path:'login', component: LoginComponent},
      {path:'account', component: AccountComponent},
      {path:'newaccount', component: NewAccountComponent},
      {path:'emailverification', component: EmailVerificationComponent},
      {path:'history', component: HistoryComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AccountModule { }
