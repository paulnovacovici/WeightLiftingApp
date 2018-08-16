import { ADDING_DATA_FAILURE, ADDING_DATA_SUCCESS, FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants'

initialState = {
  max: 0,
  isFetching: false,
  error: false
}

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case ADDING_DATA_SUCCESS:
      return state
    case ADDING_DATA_FAILURE:
      return state
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true,
        data: []
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
