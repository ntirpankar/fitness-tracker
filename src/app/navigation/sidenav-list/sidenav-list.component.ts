import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from "rxjs";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription | null;

  constructor(private authService: AuthService) {
    this.isAuth = false;
    this.authSubscription  = null;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.onSidenavClose();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
