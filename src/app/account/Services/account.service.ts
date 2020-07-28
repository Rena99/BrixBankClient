import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Account} from 'src/app/account/Models/Account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url="http://localhost:53715/login/GetAccount";
  constructor(private http: HttpClient) { }
  getAccount(id): Observable<Account>
  {
      return this.http.get<Account>(this.url+'?accountId='+id).pipe();
  }
}
