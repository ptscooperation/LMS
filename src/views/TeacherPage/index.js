import React from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
////import { Typography } from "@material-ui/core";
////import Grid from "@material-ui/core/Grid";
// core components
//#import Header from '../assets/jss/components/Header/Header.js' // ⛳
import Footer from '../assets/jss/components/Footer/Footer.js' // ⛳
////import Parallax from "../../components/Parallax/Parallax.js";
// CSS components
import teacherPageStyles from '../assets/css/_views/teacherPageStyle.js'
// Sections for this page
/////import SearchSection from "./Sections/SearchSection.js";
import AddClassSection from './addClass.section'
import ClassListSection from './classList.section'
import Header from './header.section'

const useStyles = makeStyles(teacherPageStyles)
var hist = createBrowserHistory()

function TeacherPage(props) {
  const classes = useStyles()

  return (
    <div>
      <Header id={props.match.params.id} history={props.history} />
      <div className={classNames(classes.mainX, classes.mainRaisedX)}>
        <div className={classes.containerX}>
          <Router history={hist}>
            <Switch>
              {/* <Route path="/signup-teacher" component={SignupTeacherPage} />
              <Route path="/signup-student" component={SignupStudentPage} />
              <Route path="/student/:id" component={StudentPage} />*/}
              <Route path="/teacher/:id/addclass/:id" component={AddClassSection} />
              <Route path="/" component={ClassListSection} />
            </Switch>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeacherPage
