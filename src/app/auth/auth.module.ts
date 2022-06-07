import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: []
})
export class AuthModule {}
