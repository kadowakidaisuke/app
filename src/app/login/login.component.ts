import { Component, OnInit , Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  private user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    //this.user = afAuth.authState;
  }
  /*
  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  */
}

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
