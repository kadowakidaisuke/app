import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,　// templateに変更
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {
  }

}
