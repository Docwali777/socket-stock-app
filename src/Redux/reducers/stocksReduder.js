

export function stocksReducer(state = [], action){
  const io  = require('socket.io-client')
  const socket = io()

  switch(action.type){
    case 'FIND_STOCK':
let stocksFounds = {...state}
// {x: Date.parse(d.timestamp), y: d.close}
let data = action.payload.data.map((d, i)=>{
  return {x: new Date(Date.parse(d.timestamp)).toLocaleString().split(',')[0], y: d.close}
})
let newState = [...state, {
  label: action.payload.name,
  data,
  fill: false,
  backgroundColor: 'red',
  // pointBorderColor: 'green',
  borderColor: 'purple',
  borderWidth: 1,
  radius: 1
  }]
  console.log('NEW_STATE', newState);
  socket.emit('display', {stocks: newState})
    return newState
    break;

    default:
     return state
  }
}
