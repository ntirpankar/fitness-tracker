import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UiService } from "../shared/ui.service";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions'

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>,
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }
      else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // console.log(error);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // console.log(error);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
