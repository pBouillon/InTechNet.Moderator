import { Component, OnInit, Input } from '@angular/core';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { ToastrService } from 'ngx-toastr';
import { HubService } from 'src/app/_services/hub/hub.service';
import { Hub } from 'src/app/_models/entities/hub/hub';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendees-list-widget',
  templateUrl: './attendees-list-widget.component.html',
  styleUrls: ['./attendees-list-widget.component.scss']
})
export class AttendeesListWidgetComponent implements OnInit {

  /**
   * @summary Current hub
   */
  @Input()
  public hub: Hub;

  /**
   * @summary buffer for the user to be kicked
   */
  public toBeKicked: Pupil;

  constructor(
    private hubService: HubService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toBeKicked = new Pupil();
  }

  /**
   * @summary Remove the pupil in the front side
   */
  private removePupil(): void {
    // Retrieve the user kicked
    const toBeKickedIndex = this.hub.attendees.indexOf(this.toBeKicked);
    if (toBeKickedIndex !== -1) {
      this.hub.attendees.splice(toBeKickedIndex, 1);
    }

    // Confirm kick to the current user
    this.toastr.success(
      `${this.toBeKicked.nickname} a bien été expulsé`,
      'Élève expulsé');

    // Close the modal
    document.getElementById('closeAttendeeKickModal').click();
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
   * @summary display confirmation modal before kicking the user
   */
  public onKickRequest(event): void {
    // Retrieve the attendee's id
    const attendeeId = event as number;

    // Fetch the associated attendee
    this.toBeKicked = null;
    this.hub.attendees.forEach(attendee => {
      if (attendee.id === attendeeId) {
        this.toBeKicked = attendee;
      }
    });

    // Display confirmation
    this.toBeKicked === null
      ? this.toastr.error(
        'Impossible d\'expulser cet utilisateur',
        'Une erreur est survenue')
      : document.getElementById('openAttendeeKickModal').click();
  }

  /**
   * @summary kick the user `toBeKicked`
   */
  onKick(): void {
    this.hubService.removePupil(this.hub.id, this.toBeKicked.id)
      .subscribe(
        () => {
            this.removePupil();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de l\'expulsion de l\'élève',
            'Erreur de connexion au serveur');
        });
  }

}
