import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewAccountService {

  constructor(private http: HttpClient) { }
  SendEmailToCheckUser(url, customerEmail)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    const httpBody=JSON.stringify(customerEmail)
    return this.http.post(url, httpBody, httpOptions); 
  }
}