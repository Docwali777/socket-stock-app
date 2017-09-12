const axios = require('axios');

//findStock function
const findStock = (stock, res) =>{
  const URL = `http://marketdata.websol.barchart.com/getHistory.json?apikey=34f305af2eacbc23e96a25e7c76ccd7a&symbol=${stock}&type=daily&startDate=20160831000000`

 return axios.get(URL)

}
module.exports  = {
  findStock
}
