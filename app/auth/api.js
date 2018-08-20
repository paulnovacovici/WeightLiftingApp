import { auth, database, provider } from "../config/firebase";

export function fetchHistory(data) {
  const {body, workout, reps } = data;

  repsRef = database.ref().child(body).child(workout).child(reps)
  history = []

  return repsRef.once('value', function(snapshot) {
    snapshot.forEach(function(child) {
      if (child.key != 'max')
        history.push({date:child.key,weight:child.val()});
    });
  })
  .then(() => history)
  .catch((err) => {console.log("ERROR reading history"); return err})
}

export function addData(data) {
  // @TODO: Should do checks on data before adding it (make sure it's number)
  const { body, workout, weight, reps } = data;
  var d = new Date();
  const date = (d.getMonth()+1).toString() + "-" + d.getDate().toString() + "-" + d.getFullYear().toString();

  const workoutRef = database.ref().child(body).child(workout).child(reps);

  return workoutRef.child(date).set(weight);
}

export function addMax(data) {
  const { body, workout, reps, max} = data;
  const maxRef = database.ref().child(body).child(workout).child(reps).child("max")

  return maxRef.set(max);
}

export function fetchMax(data) {
  const { body, workout, reps } = data;
  const maxRef = database.ref().child(body).child(workout).child(reps).child("max")
  var max = 0;

  return maxRef.once('value', function(snapshot) {
    if (snapshot.exists()) {
      max = snapshot.val();
    }
    else {
      database.ref().child(body).child(workout).child(reps).child("max").set(0)
      max = 0
    }
  })
  .then(() => {return max})
  .catch((err) => 0)
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
