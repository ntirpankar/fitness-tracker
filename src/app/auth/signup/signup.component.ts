import { Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';

import { AuthService } from "../auth.service";
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.subscribe(data => {
      console.log(data);
    });
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
