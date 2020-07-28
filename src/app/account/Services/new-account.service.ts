import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewAccountService {

  constructor(private http: HttpClient) { }
  addCustomer(url, customer)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    const httpBody=JSON.stringify(customer)
    return this.http.post(url, httpBody, httpOptions); 
  }
}