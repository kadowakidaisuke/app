import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFlag = true;
  stopBabble(e:any){
    e.stopPropagation();
  }
  public user: Observable<firebase.User>;

}
