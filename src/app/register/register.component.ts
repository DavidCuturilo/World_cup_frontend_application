import { Subscription } from 'rxjs';
import { RegisterUserModel } from './../models/request/register-user.request.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errorMessage: string;
  getUserObservable: Subscription;
  isLoading = false;

  async register() {
    if (this.registerForm.valid) {
      const registerUser: RegisterUserModel = {
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.errorMessage = await this.authService.register(registerUser);
      if (!this.errorMessage) {
        console.log('Successfully registered user!');
        this.isLoading = true;
      }
    } else {
      this.errorMessage = 'All fields are required!';
    }
  }

  ngOnInit(): void {}
}
