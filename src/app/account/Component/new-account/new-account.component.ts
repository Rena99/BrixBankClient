import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import{NewAccountService} from 'src/app/account/Services/new-account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  result: any = '';
  url:string='http://localhost:53715/newaccount';
  constructor(private formBuilder: FormBuilder, private accountService: NewAccountService,private route:Router) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
    });
  }

  get firstName() {
    return this.formGroup.get('firstName') as FormControl
  }

  get lastName() {
    return this.formGroup.get('lastName') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post) {
    this.accountService.addCustomer(this.url, post).subscribe({
      next: success=>{
        if(success===true){
          this.result = 'You have successfully joined Brix Bank';
          
          this.route.navigate(["./login"]);
        }
        else{
          this.result = 'Something went wrong! please try again';
        }
      },
      error: e=>console.error(e)
    })
  }
}
