import { auth, database, provider } from "../config/firebase";

export function addData(data) {
  // Should do checks on data before adding it (make sure it's number)
  const { body, workout, weight, reps } = data;
  var d = new Date();
  const date = (d.getMonth()+1).toString() + "-" + d.getDate().toString() + "-" + d.getFullYear().toString();

  const workoutRef = database.ref().child(body).child(workout).child(reps);

  return workoutRef.child(date).set(weight);
}

export function fetchMax(data) {
  const { body, workout, reps } = data;
}

export function fetchWorkouts(body) {
  const workoutRef = database.ref().child(body).child("workouts");
  var workouts = []

  return workoutRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      workouts.push(child.val())
    });
  })
  .then(() => workouts)
  .catch((err) => err);
}

export function fetchReps(body) {
  const repsRef = database.ref().child(body).child("reps");
  var reps = []

  return repsRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      reps.push(child.val())
    });
  })
  .then(() => reps)
  .catch((err) => err);
}
