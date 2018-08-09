import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'

export function fetchDataFromAPI() {
  return (dispatch) => {
    dispatch(getData())
    fetch('https://swapi.co/api/people/')  // Use database I'll create later
      .then(res => res.json())
      .then(json => dispatch(getDataSuccess(json.results)))
      .catch(err => dispatch(getDataFailure(err)))
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
