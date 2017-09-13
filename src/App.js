import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'

import Repo from './ProjectINFO'
//chart configuration
import {options} from './chartConfiguration'
//import Actions
import {findStock} from './Redux/reducer-Actions/index'

import io from 'socket.io-client'
const socket = io()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: '',
      socket,
      stockData: this.props.stocks
    }

  }

  componentWillMount() {
    this.props.findStock('BBY')
    let {socket} = this.state
    socket.on('data from server', data => {
      // console.log('data from server', data);
      this.setState({stockData: data.stocks})
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: (e.target.value).toUpperCase()
    })
  }

  submitStockInfo = (e) => {
    e.preventDefault()

    let findStock = this.props.stocks.findIndex(s => s.label === this.state.stocks)

    if (findStock === -1 && this.state.stocks !== '') {

      this.props.findStock(this.state.stocks)
      this.setState({stocks: ''})
    }

  }

  render() {
    const lineData = this.state.stockData

    const data = {
      datasets: lineData
    }
    if (lineData[0] !== undefined) {
      return (
        <div className='container'>
          <div className='row'>
        <div>
          <h1 className='text-center'>Socket Stock App</h1>
          <div >
            <hr />
            <form className='text-center' style={{
              width: '50%',
              marginLeft: '25%',
              display: 'block'
            }} onSubmit={this.submitStockInfo}>
              <input className='form-control' name='stocks' onChange={this.handleChange} value={this.state.stocks} placeholder='Enter Stock Name'/>
              <button className='btn btn-success'>Submit Stock</button>
            </form>

                <Line data={data} options={options}/>
                <Repo />

          </div>
        </div>
      </div>
    </div>
      )
    } else {
      return (
        <div></div>
      )
    }

  }
}

function mapStateToProps(state) {
  return {stocks: state.stocks}
}
export default connect(mapStateToProps, {findStock})(App)
