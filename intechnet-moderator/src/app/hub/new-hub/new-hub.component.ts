import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HubService } from 'src/app/_services/hub/hub.service';
import { RouteName } from 'src/app/routing/route-names';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-hub',
  templateUrl: './new-hub.component.html',
  styleUrls: ['./new-hub.component.scss']
})
export class NewHubComponent implements OnInit {

  /**
   * @summary login form login
   */
  newHubForm: FormGroup;

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.newHubForm.controls; }

  /**
   * @summary default constructor
   * @param authenticationService authentication service
   * @param formBuilder form builder service
   * @param router angular router
   * @param toastr toastr service
   */
  constructor(
    private hubService: HubService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  /**
   * @summary default initialize function
   */
  ngOnInit(): void {
    // Form creation
    this.createForm();
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.newHubForm = this.formBuilder.group({
      name: [
        '', [
          Validators.required,
          Validators.maxLength(22)
        ]
      ],
      description: ['', Validators.maxLength(64)]
    });
  }

  isFieldInvalid(field: string) {
    const formField = this.newHubForm.get(field);
    return formField.invalid && (formField.dirty || formField.touched);
  }

  onBack() {
    this.router.navigate([RouteName.BOARD]);
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    const hubDescription = this.f.description.value;
    const hubName = this.f.name.value;

    this.hubService
      .createHub(hubName, hubDescription)
      .subscribe(
        () => {
          this.toastr.success(
            `Votre hub "${hubName}" a bien été créé`,
            'Nouveau hub créé'
          );
          this.router.navigate([RouteName.BOARD]);
        },
        (error: HttpErrorResponse) => {
          this.newHubForm.setErrors({ server: error });
          this.toastr.error(
            'Une erreur de connexion est survenue, impossible de créer le hub',
            'Erreur de connexion au serveur'
          );
        },
      );
  }

}
