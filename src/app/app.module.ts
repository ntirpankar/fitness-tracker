import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { appReducer } from "./app.reducer";
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { environment } from "../environments/environment";
import { MaterialModule } from "./material.module";
import { TrainingService } from "./training/training.service";
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UiService } from "./shared/ui.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot({ui: appReducer}),
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
