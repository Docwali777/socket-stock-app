import axios from 'axios'

export function findStock(stocks){
  return dispatch =>{
    axios.post('/api/stocks', {stocks})
      .then(data => {
        dispatch({
          type: 'FIND_STOCK',
          payload: data.data
        })
      }).catch(e =>console.log('Cant Find Stock or Error with action'))
  }
}
