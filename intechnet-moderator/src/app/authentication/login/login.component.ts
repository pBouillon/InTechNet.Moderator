import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';

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
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  /**
   * @summary todo
   */
  ngOnInit(): void  {
    // If the user is already logged in, redirect it
    if (this.authenticationService.currentModeratorValue) {
      this.router.navigate([`/${RouteName.BOARD}`]);
    }

    // Form creation
    this.createForm();
  }

  /**
   * @summary todo
   */
  private createForm(): void {
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
      .subscribe(
        () => this.router.navigate([`/${RouteName.BOARD}`]),
        (error) => {
          // TODO: handle errors
          // this.loginForm.setErrors({ server: error });
        });
  }

}
