import { HISTORY_SUCCESS } from '../constants'


var initialState = {
  data: []
}

export default function dataReducer(state = initialState, action) {
  switch(action.type){
    case HISTORY_SUCCESS:
      return {
        ...state,
        data: action.history
      }
    default:
      return state
  }
}
