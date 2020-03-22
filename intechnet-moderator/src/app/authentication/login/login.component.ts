import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';
import { ToastrService } from 'ngx-toastr';

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
          this.loginForm.setErrors({ server: error });
          this.toastr.error(
            'Une erreur est survenue lors de la connexion au serveur',
            'Connexion impossible');
        });
  }
}
