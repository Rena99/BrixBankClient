import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Models/Login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  onFormSubmitted = new EventEmitter<any>();

  constructor(public http:HttpClient) { }

  URL:string="http://localhost:53715/login/GetLogin";
  email:string;
  password:string;
  setName(e){this.email=e}
  setPassword(p){this.password=p}

  setLocalUser(e:string,p:string)
  {
    this.setName(e);
    this.setPassword(p)
  }
  
  checkUser(login:Login):Observable<any>
  {
    return this.http.get<any>(this.URL+"?email="+login.email+"&password="+login.password);
  }
}
