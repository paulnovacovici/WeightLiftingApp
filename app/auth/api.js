import { auth, database, provider } from "../config/firebase";

export function addData(data) {
  // Should do checks on data before adding it (make sure it's number)
  const { body, workout, weight, reps } = data;
  var d = new Date();
  const date = (d.getMonth()+1).toString() + "-" + d.getDate().toString() + "-" + d.getFullYear().toString();

  const workoutRef = database.ref().child(body).child(workout).child(reps);

  return workoutRef.child(date).set(weight);
}
