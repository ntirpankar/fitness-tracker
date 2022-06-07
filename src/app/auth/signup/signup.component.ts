import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";
import { UiService } from "../../shared/ui.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit , OnDestroy {
  maxDate: Date;
  isLoading = false;
  private loadingSubs: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private uiService: UiService) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
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

  ngOnDestroy() {
    this.loadingSubs?.unsubscribe();
  }
}
