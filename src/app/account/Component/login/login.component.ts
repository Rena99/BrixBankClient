import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{Login} from 'src/app/account/Models/Login';
import { LoginService } from 'src/app/account/Services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  email:any;
  password: any;
  constructor(private loginSer:LoginService,private formBuilder: FormBuilder, private route:Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required]],
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required': '';
  }

  onSubmit(post) {
    var login = {}as Login;
    login.email=this.email;
    login.password=this.password;
    this.loginSer.checkUser(login).subscribe(
      d=>{
        if(d!=null)
        {
          this.loginSer.setName(this.email);
          this.loginSer.setPassword(this.password);
          sessionStorage.setItem("currentUser", d.accountId);
          this.route.navigate(["./account"]);
          this.loginSer.onFormSubmitted.emit();
         }
         else{
           alert(" User does not exist!")}
        }
        ,
      e=>{alert(e.message+ "  error!")}
    );
  }  
  
  enterNewUser()
  {
    this.route.navigate(["./newaccount"])
  }
  

}
