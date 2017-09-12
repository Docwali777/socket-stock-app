import React, { Component } from 'react'
import { render } from 'react-dom'

import thunk from 'redux-thunk'
import { Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'

import reducers from './Redux/reducers'

const store = createStore(reducers, applyMiddleware(thunk))

import App from './App'

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('wali'))
