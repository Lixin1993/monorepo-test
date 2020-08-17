import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import cookies from 'react-cookies'
import 'antd/dist/antd.css'

const App = () => {
  const token = cookies.load('token')
  return (
    <Router>
      {/* {token && <Redirect from="/login" to="/home" />} */}
      <Route path='/login' component={Login} />
      <Route path='/' component={Home} />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
