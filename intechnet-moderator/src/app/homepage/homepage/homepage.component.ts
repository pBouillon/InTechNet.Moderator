import { Component, OnInit } from '@angular/core';
import { ImageWidgetData } from '../../_models/image-widget/image-widget-data';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  /**
   * @summary Presentation widgets contents
   */
  public introSections: Array<ImageWidgetData>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Redirect the user if he is already logged in
    if (this.authenticationService.isModeratorLoggedIn) {
      this.router.navigate([RouteName.BOARD]);
    }

    this._initializeSections();
  }

  /**
   * @summary Initialize presentation widgets contents
   */
  private _initializeSections(): void {
    this.introSections = [
      new ImageWidgetData(
        'Sélectionnez des activités à réaliser en toute autonomie sur les '
        + 'principaux sujets du numérique, les bonnes pratiques et notions clefs',
        'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=750&h=750'
      ),
      new ImageWidgetData(
        'Organisez vos espaces de travail par thématiques et gérez en quelques clics '
        + 'les ateliers de vos classes ainsi que vos participants',
        'https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=750&h=750',
        true
      )
    ];
  }

}
