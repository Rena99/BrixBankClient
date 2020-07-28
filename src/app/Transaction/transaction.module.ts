import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransactionComponent} from 'src/app/Transaction/Component/transaction/transaction.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:'transaction', component: TransactionComponent},
      
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TransactionModule { }
