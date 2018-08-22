import { REMOVE_DATA_SUCCESS, HISTORY_SUCCESS } from '../constants'


var initialState = {
  data: []
}

export default function dataReducer(state = initialState, action) {
  switch(action.type){
    case REMOVE_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data.slice(0,action.index),...state.data.slice(action.index+1)]
      }
    case HISTORY_SUCCESS:
      return {
        ...state,
        data: action.history
      }
    default:
      return state
  }
}
