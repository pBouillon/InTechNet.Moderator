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
      nickname: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return this.registerForm.get(field).invalid
      && (this.registerForm.get(field).dirty
        || this.registerForm.get(field).touched);
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
