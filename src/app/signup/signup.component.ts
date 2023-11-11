import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.authService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.authService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signin']);
    }).catch(() => {
      this.loading = false;
    });
  }

}
