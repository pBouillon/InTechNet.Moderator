import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  login = new FormControl('', Validators.required);

  // convenience getter for easy access to form fields
  public get f() { return this.loginForm.controls; }

  constructor(private _authenticationService: AuthenticationService, private _formBuilder: FormBuilder) {   }

  ngOnInit(): void 
  {
    this.loginForm = this._formBuilder.group({
      'login': this.login,
      'password': ['', Validators.required]
    });
  }

  OnSubmitForm() {
    console.log("model-based form submitted");
    console.log(this.f.login.value, this.f.password.value);

    this._authenticationService.login(this.f.login.value, this.f.password.value)
    .subscribe();
  }

}
