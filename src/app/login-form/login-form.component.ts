import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser } from 'src/app/interfaces/login';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  model: LoggedUser = { email: 'email@email.com', password: '123' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
    this.returnUrl = '';
    this.authService.logout();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (
        this.email.value == this.model.email &&
        this.password.value == this.model.password
      ) {
        console.log('Login successful');
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.email.value);
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = 'Please check your userid and password';
      }
    }
  }
}
