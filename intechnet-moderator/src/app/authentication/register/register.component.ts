import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RouteName } from 'src/app/routing/route-names';
import { ContainsUppercase } from 'src/app/_validators/containsUppercase.validator';
import { ContainsLowercase } from 'src/app/_validators/containsLowercase.validator';
import { ContainsDigit } from 'src/app/_validators/containsDigit.validator';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   /**
    * @summary boolean for the nickname
    */
  public showNicknameTooltip = false;

  /**
   * @summary boolean for the email
   */
  public isEmailTaken = false;

  /**
   * @summary boolean for the nickname
   */
  public isNicknameTaken = false;

  /**
   * @summary boolean for the password
   */
  public showPasswordTooltip = false;

  /**
   * @summary link to the login page
   */
  public loginLink = `/${RouteName.LOGIN}`;

   /**
    * @summary register form
    */
  registerForm: FormGroup;

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.registerForm.controls; }

  /**
   * @summary default constructor
   * @param authenticationService authentication service
   * @param formBuilder form builder service
   * @param router angular router
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
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
    this.registerForm = this.formBuilder.group({
      nickname: ['', Validators.compose(
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(32)
        ]),
      ],
      email: ['', Validators.email],
      password: ['',  Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          ContainsDigit,
          ContainsLowercase,
          ContainsUppercase,
        ]),
      ],
      passwordVerification: ['', Validators.required]
    });
  }
  
  /**
   * @summary check if the field given in parameter is valid
   * @param field the field to check
   */
  isFieldInvalid(field: string) {
    const formField = this.registerForm.get(field);

    return formField.invalid
      && (formField.dirty || formField.touched);
  }
  
  /**
   * @summary check is the password verification field is valid
   */
  isPasswordVerificationInvalid() {
    const field = this.registerForm.get('passwordVerification');
    
    return field.invalid && (field.dirty || field.touched);
  }
  
  /**
   * @summary check if the validator given is OK for the password field
   * @param validatorToCheck the validator to check 
   */
  isPasswordOk(validatorToCheck: string) {
    return !this.f.password.errors 
      || !this.f.password.errors[validatorToCheck];
  }
  
  /**
   * @summary check if the password verification field is OK
   * @param validatorToCheck the validator to check 
   */
  isPasswordVerificationOk() {
    const passwordVerificationField = this.registerForm.get('passwordVerification');
    
    return passwordVerificationField.value !== this.registerForm.get('password').value;
  }
  
  /**
   * @summary On blur event for the email input
   */
  onBlurEmail() {
    this.authenticationService
    .isEmailInUse(this.f.email.value)
    .subscribe(
      (data) => {
        this.isEmailTaken = !data['areUnique'];
      },
      (error) => {
        console.log(error)
            this.registerForm.setErrors({ server: error });
          });
  }

  /**
   * @summary On blur event for the nickname input
   */
  onBlurNickname() {
    this.showNicknameTooltip = false;
    this.authenticationService
      .isNickNameInUse(this.f.nickname.value)
        .subscribe(
          (data) => {
            this.isNicknameTaken = !data['areUnique'];
          },
          (error) => {
            this.registerForm.setErrors({ server: error });
          });
  }

  /**
   * @summary On focus event for the nickname input
   */
  onFocusNickname() {
    this.showNicknameTooltip = true;
  }

  /**
   * @summary On blur event for the password input
   */
  onBlurPassword() {
    this.showPasswordTooltip = false;
  }

  /**
   * @summary On focus event for the password input
   */
  onFocusEmail() {
    this.isEmailTaken = false;
  }

  /**
   * @summary On focus event for the password input
   */
  onFocusPassword() {
    this.showPasswordTooltip = true;
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    this.authenticationService
      .register(this.f.nickname.value, this.f.email.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate([`/${RouteName.BOARD}`]);
        },
        (error) => {
          this.registerForm.setErrors({ server: error });
        });
  }

}
