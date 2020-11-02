import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import ErrorPage from './pages/404'
import 'antd/dist/antd.css'

const App = () => {
  const token = localStorage.getItem('token')
  // window.onerror = function(message, source, lineno, colno, error) {
  //   // window.location.href = '/404'
  //   console.log('-------message', message)
  //   console.log('-------source', source)
  //   console.log('-------lineno', lineno)
  //   console.log('-------colno', colno)
  //   console.log('-------error', error)
  // }
  window.addEventListener('error', (error) => {
    // window.location.href = '/404'
    console.log('-------message', error)
  })
  return (
    <Router>
      <Route path='/home' component={Home} />
      <Route path='/404' compnent={ErrorPage} />
      <Route path='/login' component={Login} />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
