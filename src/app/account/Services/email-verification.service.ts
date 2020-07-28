import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private http: HttpClient) { }
  
  CheckUser(url, customer)
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
