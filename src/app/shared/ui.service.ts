import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UiService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackbar(message: string, action: string | undefined, duration: number) {
    this.snackBar.open(message, action, {
      duration
    });
  }
}
