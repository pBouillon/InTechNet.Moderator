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
        'À travers divers modules et activités, organisez des sessions de sensibilisation ' +
        'et de formation autour des thèmes du numérique.',
        '../../../assets/img/working-student.jpg'
      ),
      new ImageWidgetData(
        'Organisez vos espaces de travail, suivez l\'avancée de vos ' +
        'participants et gérez les modules de formation assignés.',
        '../../../assets/img/computer-closeup.jpg',
        true
      )
    ];
  }

}
