import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HubService } from 'src/app/_services/hub/hub.service';
import { Hub } from 'src/app/_models/entities/hub/hub';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hub-settings-widget',
  templateUrl: './hub-settings-widget.component.html',
  styleUrls: ['./hub-settings-widget.component.scss']
})
export class HubSettingsWidgetComponent implements OnInit {

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.updateHubForm.controls; }

  /**
   * @summary Current hub
   */
  @Input()
  public hub: Hub;

  /**
   * @summary update hub form
   */
  updateHubForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private hubService: HubService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Form creation
    this.createForm();
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.updateHubForm = this.formBuilder.group({
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
    const formField = this.updateHubForm.get(field);
    return formField.invalid && (formField.dirty || formField.touched);
  }

  /**
   * @summary copy the hub's shareable link to the user's clipboard
   */
  onCopyShareableLink(): void {
    // Create temporary component holding the text to be copied
    const tempTextBox = document.createElement('textarea');
    tempTextBox.style.position = 'fixed';
    tempTextBox.style.left = '0';
    tempTextBox.style.top = '0';
    tempTextBox.style.opacity = '0';

    // Put the shareable link in the text box
    tempTextBox.value = this.hubService
      .getShareableLinkFor(this.hub.link);

    // Add the text box to the DOM
    document.body.appendChild(tempTextBox);

    // Focus and copy the content of the text box
    tempTextBox.focus();
    tempTextBox.select();
    document.execCommand('copy');

    // Clean DOM by removing the component
    document.body.removeChild(tempTextBox);

    // Notify the user
    this.toastr.success('Lien de partage copié !');
  }

  /**
   * @summary Delete the current hub and redirect the user to its board
   */
  onDeleteHub(): void {
    this.hubService.deleteHub(this.hub.id)
      .subscribe(
        () => {
          document.getElementById('closeHubDeletionModal').click();
          this.toastr.success(
            `Le hub ${this.hub.name} a bien été supprimé`,
            'Hub supprimé');
          this.router.navigate([RouteName.BOARD]);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la suppression du hub',
            'Erreur de connexion au serveur');
        });
  }

  /**
   * @summary Updates the current hub with the given informations
   */
  onUpdateHub(): void {
    const hubDescription = this.f.description.value;
    const hubName = this.f.name.value;

    this.hubService.updateHub(this.hub.id, hubName, hubDescription)
      .subscribe(
        () => {
          this.toastr.success('Le hub a bien été mis à jour',
            'Mise à jour effectuée');
          this.hub.name = hubName;
          this.hub.description = hubDescription;
        },
        () =>
        this.toastr.error('La mise à jour a échoué',
          'Erreur lors de la mise à jour'));
  }

}
