import { MAX_SUCCESS, REPS_SUCCESS, REPS_FAILURE, WORKOUTS_SUCCESS, WORKOUTS_FAILURE, CHANGED_BODY, CHANGED_WORKOUT, CHANGED_REPS, ADDING_DATA_FAILURE, ADDING_DATA_SUCCESS, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants'
import * as api from '../app/auth/api';

initialState = {
  max: 0,
  error: false,
  workouts: [],
  reps: [],
  curWorkout: '',
  curReps: '',
  body: ''
}

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case MAX_SUCCESS:
      return {
        ...state,
        max: action.max
      }
    case CHANGED_BODY:
      return {
        ...state,
        body: action.body
      }
    case WORKOUTS_SUCCESS:
      return {
        ...state,
        workouts: action.workouts
      }
    case REPS_SUCCESS:
      return {
        ...state,
        reps: action.reps
      }
    case CHANGED_WORKOUT:
      return {
        ...state,
        curWorkout: action.workout
      }
    case CHANGED_REPS:
      return {
        ...state,
        curReps: action.reps
      }
    case ADDING_DATA_SUCCESS:
      if (action.weight > state.max){
        api.addMax({body:state.body, workout:state.curWorkout, reps: state.curReps, max:action.weight})
        return {
          ...state,
          max: action.weight
        }
      }
      return state
    case ADDING_DATA_FAILURE:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
