import { REMOVE_DATA_SUCCESS, REMOVE_DATA_FAILURE, ADD_WORKOUT_SUCCESS, ADD_WORKOUT_FAILURE, HISTORY_FAILURE, HISTORY_SUCCESS, MAX_SUCCESS, MAX_FAILURE, REPS_SUCCESS, REPS_FAILURE, WORKOUTS_SUCCESS, WORKOUTS_FAILURE, CHANGED_BODY, CHANGED_WORKOUT, CHANGED_REPS, ADDING_DATA, ADDING_DATA_SUCCESS, ADDING_DATA_FAILURE, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import * as api from './app/auth/api';

export function fetchHistoryFromAPI (data) {
  return (dispatch) => {
    api.fetchHistory(data)
      .then((history) => dispatch(historySuccess(history)))
      .catch(err => dispatch(historyFailure(err)))
  }
}

export function addWorkoutToAPI(data) {
  return (dispatch) => {
    api.addWorkout(data)
      .then(() => dispatch(addWorkoutSuccess(data.workout)))
      .catch((err) => dispatch(addWorkoutFailure(err)))
  }
}

export function removeDataFromAPI(data) {
  return (dispatch) => {
    api.removeData(data)
      .then((max) => dispatch(removeDataSuccess({...data,max})))
      .catch((err) => dispatch(removeDataFailure()))
  }
}

export function addDataToAPI(data) {
  return (dispatch) => {
    dispatch(addData())
    api.addData(data)
      .then(() => dispatch(addDataSuccess(data.weight)))
      .catch(err => {dispatch(addDataFailure(err))})
  }
}

export function changeMax(data) {
  const {workout, reps, body} = data;
  return (dispatch) => {
    api.fetchMax({workout, reps, body})
      .then((max) => dispatch(fetchMaxSuccess(max)))
      .catch((err) => dispatch(fetchMaxFailure()))
  }
}

export function changeBody(body){
  return (dispatch) => {
    api.fetchWorkouts(body)
      .then((workouts) => {
        dispatch(bodyWorkoutsSuccess(workouts));
        dispatch(_changeWorkout(workouts[0]));
        return workouts[0]
      })
    .then((defaultWorkout) => {
       return api.fetchReps(body)
        .then((reps) => {
          dispatch(bodyRepsSuccess(reps));
          dispatch(_changeReps(reps[0])); // Could fail if reps is empty
          return {defaultReps:reps[0],defaultWorkout}
        })
        .catch((err) => dispatch(bodyRepsFailure(err)))
      })
    .then((data) => {
      api.fetchMax({workout:data.defaultWorkout, reps:data.defaultReps, body})
        .then((max) => {dispatch(fetchMaxSuccess(max))})
        .catch((err) => {dispatch(fetchMaxFailure())})
      })
    dispatch(_changebody(body))
  }
}

export function removeDataSuccess(data) {
  return {
    type: REMOVE_DATA_SUCCESS,
    index: data.index,
    max: data.max
  }
}

export function removeDataFailure(err) {
  return {
    type: REMOVE_DATA_FAILURE,
    err
  }
}

export function addWorkoutSuccess(workout) {
  return {
    type: ADD_WORKOUT_SUCCESS,
    workout
  }
}

export function addWorkoutFailure(err) {
  return {
    type:  ADD_WORKOUT_FAILURE,
    err
  }
}

export function historySuccess(history) {
  return {
    type: HISTORY_SUCCESS,
    history
  }
}

export function historyFailure(err) {
  return {
    type: HISTORY_FAILURE,
    err
  }
}
export function fetchMaxSuccess(max) {
  return {
    type: MAX_SUCCESS,
    max
  }
}

export function fetchMaxFailure() {
  return {
    type: MAX_FAILURE,
  }
}

export function bodyRepsSuccess(reps){
  return {
    type: REPS_SUCCESS,
    reps
  }
}

export function bodyRepsFailure(reps) {
  return {
    type: REPS_FAILURE,
    error: err
  }
}

export function changeWorkout(workout){
  return (dispatch) => {
    dispatch(_changeWorkout(workout))
  }
}

export function changeReps(reps){
  return (dispatch) => {
    dispatch(_changeReps(reps))
  }
}

export function bodyWorkoutsSuccess(workouts) {
  return {
    type: WORKOUTS_SUCCESS,
    workouts
  }
}

export function bodyWorkoutsFailure(err) {
  return {
    type: WORKOUTS_FAILURE,
    error: err
  }
}

export function _changebody(body){
  return {
    type: CHANGED_BODY,
    body
  }
}

export function _changeWorkout(workout){
  return {
    type: CHANGED_WORKOUT,
    workout
  }
}

export function _changeReps(reps){
  return {
    type: CHANGED_REPS,
    reps
  }
}

export function addData(){
  return {
    type: ADDING_DATA
  }
}

export function addDataSuccess(weight){
  return {
    type: ADDING_DATA_SUCCESS,
    weight
  }
}


export function addDataFailure(){
  return {
    type: ADDING_DATA_FAILURE
  }
}

export function getData(){
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data){
  return {
    type: FETCHING_DATA_SUCCESS,
    data
  }
}

export function getDataFailure(){
  return {
    type: FETCHING_DATA_FAILURE
  }
}
