import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * @summary todo
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * @summary todo
   */
  loginForm: FormGroup;

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.loginForm.controls; }

  /**
   * @summary todo
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * @summary todo
   */
  ngOnInit(): void  {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
  * @summary todo
  */
  OnSubmitForm() {
    this.authenticationService
    .login(this.f.login.value, this.f.password.value)
    .subscribe();
  }

}
