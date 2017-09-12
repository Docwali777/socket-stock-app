

export function stocksReducer(state = [], action){
  const io  = require('socket.io-client')
  const socket = io()

  switch(action.type){
    case 'FIND_STOCK':
let stocksFounds = {...state}

let data = action.payload.data.map((d, i)=>{
  return {x: Date.parse(d.timestamp), y: d.close}
})
let newState = [...state, {
  name: action.payload.name,
  values: data,
  strokeWidth: 3
  }]
  socket.emit('display', {stocks: newState})
    return newState
    break;

    default:
     return state
  }
}
