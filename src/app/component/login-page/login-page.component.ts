import { Component, ElementRef, OnInit } from '@angular/core';
import { WebSocketService } from "../../web-socket.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import {
  Router
} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // Variables
  form!: FormGroup
  loading: boolean = false;
  errors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.initForm();
  }

  ngOnInit(): void { }
  private initForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }
  /**
   * Login the user based on the form values
   */
  login(): void {
    this.loading = true;
    this.errors = false;
    this.authService.login(this.controls['email'].value, this.controls['password'].value)
      .subscribe((res: any) => {
        console.log(res);
        let expireDate = new Date()
        let timestamp = Math.floor(expireDate.getTime()/1000) + res.expires_in;
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('expires_in', timestamp)
        this.loading = false;
        // Navigate to home page
        this.router.navigate(['/home']);
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.loading = false;
        this.errors = true;
      });
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

}
