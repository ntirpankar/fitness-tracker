import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { UiService } from "../../shared/ui.service";
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>,
  ) { }

  ngOnInit(): void {
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.store.subscribe(data => {
      console.log(data);
    });
  }

  onSubmit(f: NgForm) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password,
    });
  }
}
