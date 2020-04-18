import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { RouteName } from 'src/app/routing/route-names';

/**
 * @summary login component containing login form and actions
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * @summary pupil login page
   */
  public loginLink: string;

  /**
   * @summary link to the registration page
   */
  public registerLink = `/${RouteName.REGISTER}`;

  /**
   * @summary login form login
   */
  loginForm: FormGroup;

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.loginForm.controls; }

  /**
   * @summary default constructor
   * @param authenticationService authentication service
   * @param formBuilder form builder service
   * @param router angular router
   * @param toastr toastr service
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  /**
   * @summary default initialize function
   */
  ngOnInit(): void  {
    this.loginLink = `${environment.pupilFrontUri}/${RouteName.LOGIN}`;

    // If the user is already logged in, redirect it
    if (this.authenticationService.isModeratorLoggedIn) {
      this.router.navigate([`/${RouteName.BOARD}`]);
    }

    // Form creation
    this.createForm();
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

/**
 * @summary check if the field given in parameter is valid
 * @param field the field to check
 */
  isFieldInvalid(field: string) {
    return this.loginForm.get(field).invalid
      && (this.loginForm.get(field).dirty
        || this.loginForm.get(field).touched);
  }

  OnForgottenPassword() {
    // To be implemented
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    this.authenticationService
      .login(this.f.login.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate([`/${RouteName.BOARD}`]);
        },
        (error) => {
          this.toastr.error(
            'Une erreur est survenue lors de la connexion au serveur',
            'Erreur de connexion au serveur');
          this.loginForm.setErrors({ server: error });
        });
  }
}
