import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private firebaseAuth: AngularFireAuth ) {

    console.log(`user is logged in: ${ this.isLoggedIn() }`);

    this.firebaseAuth.auth.onAuthStateChanged(
      ( user: firebase.User | null ) => {

        if ( user !== null ) {
          console.log(`user logged in: ${ user.email }`);
        }
      },
      ( error: firebase.auth.Error ) => {

        console.log( error );
      }
    );
  }

  /**
   * @returns a promise with the current user (firebase.User interface)
   *  or -if nobody is logged in- null.
   */
  getCurrentUser(): firebase.User | null {
    return this.firebaseAuth.auth.currentUser;
  }

  isLoggedIn(): boolean {
    // user is logged in if currentUser !== null
    return null !== this.getCurrentUser();
  }

  /**
   * Note: if function is successful
   * (i.e. if function returns a Promise holding true),
   * then the page refreshes, so there's no point in
   * hoping for the promise to resolve to true.
   * @returns success/failure of sign-in
   */
  async signInWithEmailAndPassword(
    email: string, password: string
  )
  : Promise<boolean> {

    return new Promise<boolean>(( resolve ) => {

      this.firebaseAuth.auth.signInWithEmailAndPassword(
        email, password
      )
      .then(( user_cred: firebase.auth.UserCredential ) => {

        resolve( true );
      })
      .catch(( error ) => {

        resolve( false );
      });
    });
  }
}
