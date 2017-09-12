const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

const server = require('../sockets')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

require('../Routes')(app)

app.get('/', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

server(app).listen(PORT, (err)=>{
  if(err) console(err)
  else console.log(`Server on port: ${PORT}`)
})
