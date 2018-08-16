import { ADDING_DATA, ADDING_DATA_SUCCESS, ADDING_DATA_FAILURE, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
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
      .catch(err => dispatch(addDataFailure(err)))
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
