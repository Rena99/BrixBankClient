import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
 import { EmailVerificationService} from 'src/app/account/Services/email-verification.service';
import { Router } from '@angular/router';
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
  url:string='http://localhost:53715/EmailVerification';
  constructor(private EmailVerificationSer:EmailVerificationService,private formBuilder: FormBuilder, private route:Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(post) {
    this.EmailVerificationSer.CheckUser(this.url, post).subscribe({
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
