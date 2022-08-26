import { UserModel } from '../models/user.model';
import { RegisterUserModel } from './../models/request/register-user.request.model';
import { EnvService } from './../services/env/env.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector
  ) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errorMessage: string = '';
  envService: EnvService = this.injector.get(EnvService);
  user: UserModel;

  register() {
    if (this.registerForm.valid) {
      const registerUser: RegisterUserModel = {
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.http
        .post<UserModel>(
          `${this.envService.apiURL}/auth/registerUser`,
          registerUser
        )
        .subscribe(
          (userData) => {
            this.user = userData;
            console.log(
              'Successfully registered user! User: ',
              JSON.stringify(this.user)
            );
            this.router.navigate(['/standings']);
          },
          (error) => {
            if (error.status === 406) {
              this.errorMessage = 'Username already taken.';
            }
          }
        );
    } else {
      this.errorMessage = 'All fields are required!';
    }
  }

  ngOnInit(): void {}
}
