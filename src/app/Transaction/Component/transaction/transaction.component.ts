import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/Transaction/Services/transaction.service';
import { Transaction } from 'src/app/Transaction/Models/Transaction‏';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  result: any = '';
  amount : number;
  fromAccount :string;
  toAccount :string;
  currentUser:any;
  submitted=false;
  url="http://localhost:56198/Transaction";
  
  constructor(private formBuilder: FormBuilder,private transactionSer:TransactionService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'toAccount': [null, [Validators.required]],
      'amount': [null, [Validators.required,this.checkAmount]],
    });
  }

  checkAmount(control) {
     let enteredAmount = control.value;
    if (enteredAmount<1||enteredAmount>1000000) {
     return {'requirements': true}
    }
    else  {
      return null;
    }
  }

  onSubmit(post){
    this.submitted=true;
    var transaction = {}as Transaction;
    transaction.toAccount=this.toAccount;
    transaction.amount=this.amount;
    transaction.fromAccount=this.currentUser= sessionStorage.getItem("currentUser");
    this.transactionSer.bankTransfer(this.url, transaction).subscribe({
      next: success=>{
        if(success===true){
          this.result = 'Your transaction has successfully sent';
        }
        else{
          this.result = 'Something went wrong! please try again';
        }
      },
       error: e=>console.log(e)
    })
  }

  getErrorToAccount() {
    return this.formGroup.get('toAccount').hasError('required') ? 'Field is required' :'';
  }

  getErrorAmount() {
    return this.formGroup.get('amount').hasError('required') ? 'Field is required' :'';
  }
}
