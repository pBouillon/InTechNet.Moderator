import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   /**
   * @summary link to the login page
   */
  public showNicknameTooltip: boolean = false;

  /**
  * @summary link to the login page
  */
  public showPasswordTooltip: boolean = false;
  
  /**
   * @summary link to the login page
   */
  public loginLink = `/${RouteName.LOGIN}`;

   /**
   * @summary register form register
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
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      email: ['', Validators.email],
      password: ['',  Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(64), Validators.pattern('[a-zA-Z1-9]')])],
      passwordVerification: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return this.registerForm.get(field).invalid
      && (this.registerForm.get(field).dirty
        || this.registerForm.get(field).touched);
  }

  isPasswordVerificationInvalid(){
    return this.registerForm.get('passwordVerification').invalid
      && (this.registerForm.get('passwordVerification').dirty
        || this.registerForm.get('passwordVerification').touched);
  }

  isPasswordVerificationOK(){
    return this.registerForm.get('passwordVerification').value != this.registerForm.get('password').value;
  }

  /**
   * @summary On blur event for the nickname input
   */
  onBlurNickname(){
    this.showNicknameTooltip = false;
  }

  /**
   * @summary On focus event for the nickname input
   */
  onFocusNickname(){
    this.showNicknameTooltip = true;
  }

  /**
   * @summary On blur event for the password input
   */
  onBlurPassword(){
    this.showPasswordTooltip = false;
  }

  /**
   * @summary On focus event for the password input
   */
  onFocusPassword(){
    this.showPasswordTooltip = true;
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    console.log("hey1");
    this.authenticationService
      .register(this.f.nickname.value, this.f.email.value, this.f.password.value)
      .subscribe(
        () => {
          console.log("hey13");
          this.router.navigate([`/${RouteName.BOARD}`]);
        },
        (error) => {
          
          console.log("hey fuck ", error);
          this.registerForm.setErrors({ server: error });
        });
  }

}
