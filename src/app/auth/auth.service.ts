import { Router } from '@angular/router';
import { RegisterUserRequestDto } from './../../../../world_cup_backend/src/auth/dto/register-user.request.dto';
import { UserModel } from './../models/user.model';
import { EnvService } from './../services/env/env.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginUserModel } from '../models/request/login-user.request.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private router: Router
  ) {}

  envService: EnvService = this.injector.get(EnvService);
  private access_token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  errorMessage: string = '';
  private tokenTimer;

  getToken() {
    return this.access_token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  signIn(loginUser: LoginUserModel) {
    this.http
      .post<{ access_token: string; expiresIn: number }>(
        `${this.envService.apiURL}/auth/loginUser`,
        loginUser
      )
      .subscribe((response) => {
        const access_token = response.access_token;
        this.access_token = access_token;
        if (access_token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(access_token, expirationDate);

          this.router.navigate(['/standings']);
        }
      }),
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Wrong username or password';
        }
      };

    return this.errorMessage;
  }

  register(registerUser: RegisterUserRequestDto) {
    this.http
      .post<{ access_token: string; expiresIn: number }>(
        `${this.envService.apiURL}/auth/registerUser`,
        registerUser
      )
      .subscribe((response) => {
        const access_token = response.access_token;
        this.access_token = access_token;
        if (access_token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(access_token, expirationDate);

          this.router.navigate(['/standings']);
        }
      }),
      (error) => {
        if (error.status === 406) {
          this.errorMessage = 'Username already taken.';
        }
      };

    return this.errorMessage;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0) {
      this.access_token = authInformation.access_token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.access_token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/signIn']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      access_token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
