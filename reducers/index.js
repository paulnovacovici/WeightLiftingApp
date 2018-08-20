import { combineReducers } from 'redux'
import data from './data'
import history from './history'

const rootReducer = combineReducers({
  data,
  history
})


export default rootReducer
