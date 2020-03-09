import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-names';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  onHome() {
    this.router.navigate([RouteName.HOMEPAGE]);
  }
}
