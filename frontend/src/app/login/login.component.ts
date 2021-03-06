import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage:string = "Invalid Credentials";
  successMessage:string = "";
  invalidLogin = false;
  loginSuccess = false;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin() {
    console.log("clicked");
    this.authservice.login(this.email, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = "Login Successful";
      //redirect to main page
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
