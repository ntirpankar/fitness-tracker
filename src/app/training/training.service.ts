import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { Subscription } from "rxjs";

import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
    this.runningExercise = {calories: 0, duration: 0, id: "", name: ""};
  }

  fetchAvailableExercises() {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              // @ts-ignore
              ...doc.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        // console.log(error);
      });
  }

  startExercise(selectedId: string) {
    // this.db.doc(`availableExercises/${ selectedId }`).update({ lastSelected: new Date() })
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.runningExercise = selectedExercise ?? this.runningExercise;
    if (this.runningExercise) {
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    }
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises) => {
        this.finishedExercisesChanged.next(exercises as Exercise[]);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
