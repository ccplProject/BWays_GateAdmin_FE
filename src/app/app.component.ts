// angular import
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// project import
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent, NgxSpinnerModule]
})
export class AppComponent {
  // public props
  constructor(
    private loader: NgxSpinnerService
  ) {

  }
  ngOnInit() {
    // this.loader.show();
    // this.loader.hide();
  }
}
