import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    //console.log('form.cpassword '+form.value['cpassword'])
    //console.log('form.password '+form.value['password'])
    if (form.value['cpassword'] === form.value['password']){
    this.userService.postUser(form.value).subscribe( // we are calling the service file method , and it is returning an observer and we are subscribing to that here 
      res => { //success
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {//error
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
    }else{
      this.serverErrorMessages = 'Password Mismatch !';
    }
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    cpassword: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
