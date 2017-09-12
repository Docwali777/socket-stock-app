import React, {Component} from 'react'
import {LineChart} from 'rd3'
import {connect} from 'react-redux'

//import Actions
import {findStock} from './Redux/reducer-Actions/index'

import io from 'socket.io-client'
const socket = io()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: '',
      people: '',
      socket,
      stockData: this.props.stocks
    }

  }

  componentWillMount() {
    this.props.findStock('bby')
    let {socket} = this.state
    socket.on('data from server', data => {
      console.log('data from server', data);
      this.setState({stockData: data.stocks})
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitStockInfo = (e) => {
    e.preventDefault()

    let findStock = this.props.stocks.findIndex(s => s.name === this.state.stocks)

    if (findStock === -1 && this.state.stocks !== '') {

      this.props.findStock(this.state.stocks)
      this.setState({stocks: ''})
    }

  }
  sendData = () => {
    console.log(this.props.stocks);
  }

  render() {

    const lineData = this.state.stockData
    console.log('lineData', lineData);
    return (
      <div>
        <h1>Socket Stock App</h1>
        <div>
          <form className='form-group' onSubmit={this.submitStockInfo}>
            <input className='form-control' name='stocks' onChange={this.handleChange} value={this.state.stocks} placeholder='Enter Stock Name'/>
            <button>Submit Stock</button>
          </form>
          <div className='container'>
            <div className='row'>
              <LineChart legend={true} xAccessor={(d) => {
                return new Date(d.x);
              }} yAccessor={(d) => d.y} data={lineData} circleRadius={1} width={'100%'} height={400} title="Stock Market" yAxisLabel="Market Close Data" xAxisLabel="Elapsed Time (sec)" viewBoxObject={{
                x: 0,
                y: 0,
                width: 1200,
                height: 400
              }} domain={{
                x: [1472616000000],
                y: [-10]
              }} gridHorizontal={true}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {stocks: state.stocks}
}
export default connect(mapStateToProps, {findStock})(App)
