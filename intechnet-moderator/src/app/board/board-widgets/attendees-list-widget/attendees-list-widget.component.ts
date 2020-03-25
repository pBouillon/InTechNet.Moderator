import { Component, OnInit, Input } from '@angular/core';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendees-list-widget',
  templateUrl: './attendees-list-widget.component.html',
  styleUrls: ['./attendees-list-widget.component.scss']
})
export class AttendeesListWidgetComponent implements OnInit {

  /**
   * @summary An array of all pupils attending this hub
   */
  @Input()
  public attendees: Array<Pupil>;

  /**
   * @summary buffer for the user to be kicked
   */
  public toBeKicked: Pupil;

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toBeKicked = new Pupil();
  }

  /**
   * @summary display confirmation modal before kicking the user
   */
  public onKickRequest(event): void {
    // Retrieve the attendee's id
    const attendeeId = event as number;

    // Fetch the associated attendee
    this.toBeKicked = null;
    this.attendees.forEach(attendee => {
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
    // TODO: kick logic and service call
    this.toastr.error('To be implemented');

    // Retrieve the user kicked
    const toBeKickedIndex = this.attendees.indexOf(this.toBeKicked);
    if (toBeKickedIndex !== -1) {
      this.attendees.splice(toBeKickedIndex, 1);
    }

    // Confirm kick to the current user
    this.toastr.success(
      `L'élève ${this.toBeKicked.nickname} a bien été expulsé`,
      'Élève expulsé');

    // Close the modal
    document.getElementById('closeAttendeeKickModal').click();
  }

}
