import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private http: HttpClient) { }
  
  emailVerification(url,custemer)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    const httpBody=JSON.stringify(custemer);
    // var third = angular.extend(customerEmail, custemer);
    return this.http.post(url, httpBody, httpOptions); 
  }
}
