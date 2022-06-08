import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { AuthData } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UiService } from "../shared/ui.service";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

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
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      }
      else {
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // console.log(error);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // console.log(error);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
