import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-hub',
  templateUrl: './new-hub.component.html',
  styleUrls: ['./new-hub.component.scss']
})
export class NewHubComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
