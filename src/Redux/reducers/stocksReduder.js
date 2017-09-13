const color = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

//helper functions
import h from '../../../helpers'

export function stocksReducer(state = [], action){
  const io  = require('socket.io-client')
  const socket = io()

  switch(action.type){
    case 'FIND_STOCK':
let stocksFounds = {...state}

let data = action.payload.data.map((d, i)=>{
  return {x: new Date(Date.parse(d.timestamp)).toLocaleString().split(',')[0], y: d.close}
})

let g = h.randomColor(color)

let newState = [...state, {
  label: action.payload.name,
  data,
  fill: false,
  backgroundColor: g,
  borderColor: g,
  borderWidth: 1,
  radius: 0
  }]

  socket.emit('display', {stocks: newState})
    return newState
    break;

    default:
     return state
  }
}
