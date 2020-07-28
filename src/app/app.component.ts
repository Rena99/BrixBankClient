import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './account/Services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BrixBank';
  signedIn=true;
constructor(private route:Router, private logInService : LoginService) {
  this.logInService.onFormSubmitted.subscribe(() => {
    this.onFormSubmit();
 });
}

onFormSubmit() {
 this.signedIn=true;
}

routeToAccount(){
  this.route.navigate(["./account"]);
}

routeToTransaction(){
  this.route.navigate(["./transaction"]);
}

routeToHistory(){
  this.route.navigate(["./history"]);
}

routeToSignIn(){
    this.route.navigate(["./login"]);
    sessionStorage.setItem("currentUser","")
    this.signedIn=false;
}
}
