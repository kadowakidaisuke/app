import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-login></app-login><router-outlet></router-outlet>`,　// templateに変更
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {
  }

}
