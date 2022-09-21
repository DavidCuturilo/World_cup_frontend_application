import { LoginUserModel } from './../models/request/login-user.request.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  signInForm: FormGroup;

  errorMessage: string = '';
  getUserObservable: Subscription;
  isLoading = false;

  ngOnInit(): void {
    this.signInForm  = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async signIn() {
    if (this.signInForm.valid) {
      const loginUser: LoginUserModel = {
        username: this.signInForm.value.username,
        password: this.signInForm.value.password,
      };
      this.errorMessage = await this.authService.signIn(loginUser);

      if (!this.errorMessage) {
        console.log('User successfully loggedIn!');
        this.isLoading = true;
      }
    } else {
      if(!this.signInForm.value.username || !this.signInForm.value.password) {
        this.errorMessage = 'Username and password can not be empty!';
      } else if(this.signInForm.value.password.length < 6) {
        this.errorMessage = 'Password must have 6 or more characters!'
      }
    }
  }
}
