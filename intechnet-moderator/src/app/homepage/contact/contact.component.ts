import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  /**
   * @summary fetch the current environment contact address
   */
  mailAddress = environment.mailAddress;

  constructor() { }

  ngOnInit(): void { }

}
