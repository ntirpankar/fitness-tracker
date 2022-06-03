import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { TrainingService } from "./training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription | null;

  constructor(private trainingService: TrainingService) {
    this.exerciseSubscription = null;
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.ongoingTraining = !!exercise;
    });
  }

  ngOnDestroy() {
    this.exerciseSubscription?.unsubscribe();
  }
}
