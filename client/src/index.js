import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import ThemedApp from './ThemedApp'
import './index.css'

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <ThemedApp />
    </Router>
  </Provider>, document.getElementById('root')
)