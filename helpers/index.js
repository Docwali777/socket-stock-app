const axios = require('axios');
const config = require('../config')

//findStock function
const findStock = (stock, res) =>{
  const URL = `http://marketdata.websol.barchart.com/getHistory.json?apikey=${config.BAR_CHART_API_KEY}&symbol=${stock}&type=daily&startDate=20160831000000`

 return axios.get(URL)

}

const  randomColor =(data) =>{
  let colorString = ''
  for (let i = 0; i < data.length; i++){
  let random = Math.floor(Math.random() * (9 - 0 ) + 1)
  colorString += data[random]

}
let randomC = (colorString.slice(0, 6));
console.log(`#${randomC}`);
return `#${randomC}`
}
module.exports  = {
  findStock,
  randomColor
}
