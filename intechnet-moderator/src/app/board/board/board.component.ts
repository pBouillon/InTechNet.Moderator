import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Moderator } from 'src/app/_models/entities/moderator/moderator';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public currentModerator: Moderator;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.currentModerator = this.authenticationService.currentModerator;
  }

}
