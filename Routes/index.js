const axios = require('axios');
const h = require('../helpers')

module.exports = (app) =>{
app.post('/api/stocks', (req, res)=>{
  let{ stocks } = req.body
//helper function to find stocks from API
  h.findStock(stocks)
    .then(data => {
      if(data.data.results !== null){
      res.send({name: stocks, data: data.data.results})
    }
  })
  .catch(e =>  console.log('Cound not obtain stocks from API'))



})
}
