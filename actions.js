import { REPS_SUCCESS, REPS_FAILURE, WORKOUTS_SUCCESS, WORKOUTS_FAILURE, CHANGED_BODY, CHANGED_WORKOUT, CHANGED_REPS, ADDING_DATA, ADDING_DATA_SUCCESS, ADDING_DATA_FAILURE, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import * as api from './app/auth/api';

export function fetchDataFromAPI() {
  return (dispatch) => {
    dispatch(getData())
    api.getData(data)
      .then(json => dispatch(getDataSuccess(json.results)))
      .catch(err => dispatch(getDataFailure(err)))
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

export function changeBody(body){
  return (dispatch) => {
    api.fetchWorkouts(body)
      .then((workouts) => dispatch(bodyWorkoutsSuccess(workouts)))
      .catch((err) => dispatch(bodyWorkoutsFailure(err)))
    api.fetchReps(body)
      .then((reps) => dispatch(bodyRepsSuccess(reps)))
      .catch((err) => dispatch(bodyRepsFailure(err)))
    dispatch(_changebody(body))
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
