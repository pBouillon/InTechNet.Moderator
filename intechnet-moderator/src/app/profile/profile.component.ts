import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as feather from 'feather-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import { SubscriptionPlanService } from '../_services/subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from '../_models/entities/subscription-plan/subscription-plan';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  /**
   * @summary Collection of all available subscription plans
   */
  public subscriptionPlans: Array<SubscriptionPlan>;

  /**
   * @summary Subscription plan of the current moderator
   */
  public currentSubscriptionPlan: SubscriptionPlan;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private subscriptionPlanService: SubscriptionPlanService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    // Fetch the current subscription plan
    this.currentSubscriptionPlan = this.authenticationService.currentModerator.subscriptionPlanDto;

    // Load all available subscription plans
    this.subscriptionPlans = [];

    this.subscriptionPlanService.getSubscriptionPlans()
      .subscribe(
        (data: Array<SubscriptionPlan>) => {
          data.map(raw => this.subscriptionPlans.push(raw));
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la communication avec le serveur',
            'Erreur de connexion');
        });
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
