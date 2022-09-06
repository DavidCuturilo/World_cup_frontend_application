import { LoginUserModel } from './../models/request/login-user.request.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string = '';
  getUserObservable: Subscription;
  isLoading = false;

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.valid) {
      const loginUser: LoginUserModel = {
        username: this.signInForm.value.username,
        password: this.signInForm.value.password,
      };
      this.errorMessage = this.authService.signIn(loginUser);

      if(!this.errorMessage) {
        console.log('User successfully registered!');
        this.isLoading = true;
      }

    } else {
      this.errorMessage = 'Username and password can not be empty!';
      console.log('All fields are required!');
    }
  }

}
