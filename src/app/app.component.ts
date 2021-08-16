import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'integration-coverage';
  clicked = false;

  click1() {
    console.log('click1');
    this.clicked = true;
  }
}
