import React, {Component} from 'react'
// import {LineChart} from 'rd3'
import {connect} from 'react-redux'
import { LineChart, Chart } from 'react-d3'
import {Line} from 'react-chartjs-2'
//import Actions
import {findStock} from './Redux/reducer-Actions/index'

import io from 'socket.io-client'
const socket = io()

const options = {
  responsive: true,
  title: {
    display: true,
    text: 'Socket Stock Charts'
  },
  tooltips: {
    mode: 'label'
  },
  hover: {
    mode: 'dataset'
  },
  scales: {
    xAxes: [
      {
        type: 'time'
      },
      {
        display: false,
        type: 'linear',
        scaleLabel: {
          show: true
        } ,
        ticks: {
            min: 1472616000000,
            max: 1502616000000
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Value'
        }
      }
    ]
  }
}


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

    // let findStock = this.props.stocks.findIndex(s => s.name === this.state.stocks)

    // if (findStock === -1 && this.state.stocks !== '') {

      this.props.findStock(this.state.stocks)
      this.setState({stocks: ''})
    // }

  }


  render() {
    const lineData = this.state.stockData
    // console.log(lineData);
    const data = {
      datasets: lineData
    }
    console.log(data);
if(lineData[0] !== undefined){
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
            {/* react-d3 <LineChart data={lineData} width={500} height={250}  /> */}
            <Line data={data} options={options} />
            {/* <LineChart legend={true} xAccessor={(d) => {
              return new Date(d.x);
            }} yAccessor={(d) => d.y} data={lineData} circleRadius={1} width={'100%'} height={400} title="Stock Market" yAxisLabel="Market Close Data" xAxisLabel="Elapsed Time (sec)" viewBoxObject={{
              x: 0,
              y: 0,
              width: 1200,
              height: 400
            }} domain={{
              x: [1472616000000],
              y: [-10]
            }} gridHorizontal={true}/> */}
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
} else {
  return (<div></div>)
}


  }
}

function mapStateToProps(state) {
  return {stocks: state.stocks}
}
export default connect(mapStateToProps, {findStock})(App)
