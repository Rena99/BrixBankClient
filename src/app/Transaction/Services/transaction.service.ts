import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../Models/Transaction‏';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http:HttpClient) { }

  URL:string="http://localhost:56198/Transaction";
  amount : number;
  fromAccount :string;
  toAccount :string;

  bankTransfer(url, transaction:Transaction):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    const httpBody=JSON.stringify(transaction);
    return this.http.post<any>(url,httpBody,httpOptions).pipe();
  }
 }
