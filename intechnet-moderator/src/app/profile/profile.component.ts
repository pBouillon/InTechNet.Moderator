import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as feather from 'feather-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
  }

  /**
   * @summary Delete the current account of the logged moderator
   */
  public onAccountDeletion(): void {
    // Delete the profile on the server side
    this.toastr.warning('Aucun appel à l\'API effectué', 'WiP');

    // logout the current user
    this.authenticationService.logout();

    // Confirm the account deletion
    this.toastr.success(
      'Votre compte a été supprimé avec succès',
      'Compte supprimé');

    // Redirect to homepage
    this.router.navigate(['/']);
    document.getElementById('closeAccountDeletionModal').click();
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
