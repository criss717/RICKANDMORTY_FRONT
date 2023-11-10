import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/Store/store'
import { Provider } from 'react-redux'
import axios from 'axios'

//axios.defaults.baseURL='http://localhost:3001' // para trabajar localmente
axios.defaults.baseURL='https://rickandmorty717.fly.dev/' // para producción

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
