import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 import { EmailVerificationService} from 'src/app/account/Services/email-verification.service';
import { Router } from '@angular/router';
import { EmailVerification } from 'src/app/account/Models/EmailVerification';
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  result: any = '';
  url:string='http://localhost:53715/newaccount';
  constructor(private EmailVerificationSer:EmailVerificationService,private formBuilder: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'verificationCode': [null, Validators.required]
    });
  }

  onSubmit(post) {
    var emailVerification ={}as EmailVerification;
    emailVerification.verificationCode=post.verificationCode;
    emailVerification.email=sessionStorage.getItem("currentUserEmail");
    emailVerification.firstName=sessionStorage.getItem("currentUserFirstName");
    emailVerification.lastName=sessionStorage.getItem("currentUserLastName");
    emailVerification.password=sessionStorage.getItem("currentUserPassword");
    this.EmailVerificationSer.emailVerification(this.url, emailVerification).subscribe({
       next: success=>{
          this.route.navigate(["./login"]);
      },
      error: e=>console.error(e)
    })
  }
}
