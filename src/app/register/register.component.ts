import { Subscription } from 'rxjs';
import { RegisterUserModel } from './../models/request/register-user.request.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  registerForm: FormGroup;
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
      if (
        !this.registerForm.value.password ||
        !this.registerForm.value.name ||
        !this.registerForm.value.lastname ||
        !this.registerForm.value.username
      ) {
        this.errorMessage = 'All fields are required!';
      } else if (this.registerForm.value.password.length < 6) {
        this.errorMessage = 'Password must have 6 or more characters!';
      }
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
