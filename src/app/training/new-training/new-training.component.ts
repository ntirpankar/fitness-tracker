import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Store } from '@ngrx/store';

import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] | undefined;
  exercisesSubscription: Subscription | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.subscribe(data => {
      console.log(data);
    });
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises ? exercises : undefined;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exercisesSubscription?.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
