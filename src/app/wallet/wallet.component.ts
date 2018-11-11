import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  walletForm: FormGroup
  currentAmount:Number = 0
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.walletForm = this.fb.group({
      amount: ['', Validators.required]
    });

    this.getUserData()


  }

   // get user data on the basis of user ID
   getUserData() {
    // getUserData starts
    this.userService.getUserData(localStorage.getItem('currentUser'))
      .subscribe(userData => {
        if (userData) {
          this.currentAmount=parseInt(userData.wallet);
        }
      }, err => {
        console.log('Something went wrong!')
      }
      )  //getUserData ends
  }

  // update wallet
  updateWallet() {
    this.userService.updateWallet(this.walletForm.value.amount,localStorage.getItem('currentUser'))
      .subscribe(updatedamount => {
        if (updatedamount) {
          this.currentAmount=updatedamount['wallet']
        }
      }, err => {
        console.log('Something went wrong!')
      }
      )  //update wallet ends
  }

  // get set property used for validation
  get amount() { return this.walletForm.get('amount') }

}
