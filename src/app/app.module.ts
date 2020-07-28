import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {MaterialModule} from './material/material.module'
import {AccountModule} from './account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TransactionModule} from 'src/app/Transaction/transaction.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TransactionModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    AccountModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
