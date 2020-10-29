import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import 'antd/dist/antd.css'

const App = () => {
  const token = localStorage.getItem('token')
  window.onerror = function(message, source, lineno, colno, error) {
    console.log('-------message', message)
    console.log('-------source', source)
    console.log('-------lineno', lineno)
    console.log('-------colno', colno)
    console.log('-------error', error)
  }
  console.log('------token', token);
  return (
    <Router>
      <Route path='/' render={() => (!token ? (<Redirect to="/login" />) : (<Home />))} />
      <Route path='/login' render={() => (token ? (<Redirect to="/" />) : (<Login />))} />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
