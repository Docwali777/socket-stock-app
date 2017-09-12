import { combineReducers} from 'redux'

import { stocksReducer } from './stocksReduder'


export default combineReducers({
  stocks: stocksReducer
})
