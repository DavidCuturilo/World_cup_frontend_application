import { LoginUserModel } from './../models/request/login-user.request.model';
import { EnvService } from './../services/env/env.service';
import { UserModel } from '../models/user.model';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector
  ) {}

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage: string = '';
  user: UserModel;
  envService: EnvService = this.injector.get(EnvService);

  ngOnInit(): void {}

  signIn() {
    if (this.signInForm.valid) {
      const loginUser: LoginUserModel = {
        username: this.signInForm.value.username,
        password: this.signInForm.value.password,
      };

      this.http
        .post<UserModel>(`${this.envService.apiURL}/auth/loginUser`, loginUser)
        .subscribe(
          (userData) => {
            this.user = userData;
            console.log('User ', JSON.stringify(this.user));
            this.router.navigate(['/standings']);
          },
          (error) => {
            console.log('Error: ', error.status);
            if (error.status === 401) {
              this.errorMessage = 'Wrong username or password';
            }
          }
        );
    } else {
      this.errorMessage = 'Username and password can not be empty!';
      console.log('All fields are required!');
    }
  }
}
