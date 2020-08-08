import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
// pages for this product
import LoginPage from './views/LoginPage'
import SignupStudentPage from './views/SignupStudentPage'
import SignupTeacherPage from './views/SignupTeacherPage'
import StudentPage from './views/StudentPage'
import TeacherPage from './views/TeacherPage'

var hist = createBrowserHistory()

function MainPage(params) {
  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route path="/signup-teacher" component={SignupTeacherPage} />
          <Route path="/signup-student" component={SignupStudentPage} />
          <Route path="/student/:id" component={StudentPage} />
          <Route path="/teacher/:id" component={TeacherPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<MainPage />, document.getElementById('root'))
