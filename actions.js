import { MAX_SUCCESS, MAX_FAILURE, REPS_SUCCESS, REPS_FAILURE, WORKOUTS_SUCCESS, WORKOUTS_FAILURE, CHANGED_BODY, CHANGED_WORKOUT, CHANGED_REPS, ADDING_DATA, ADDING_DATA_SUCCESS, ADDING_DATA_FAILURE, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import * as api from './app/auth/api';

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
