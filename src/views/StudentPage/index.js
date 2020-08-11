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
import Header from './header.section'
import Footer from '../assets/jss/components/Footer/Footer.js' // ⛳
////import Parallax from "../../components/Parallax/Parallax.js";
// CSS components
import studentPageStyles from '../assets/css/_views/studentPageStyle.js'
// Sections for this page
import ClassListSection from './classList.section'
import FeedSection from './feed.section'

const useStyles = makeStyles(studentPageStyles)
var hist = createBrowserHistory()

function StudentPage(props) {
  const classes = useStyles()

  return (
    <div>
      <Header id={props.match.params.id} history={props.history} />
      <div className={classNames(classes.mainX, classes.mainRaisedX)}>
        <div className={classes.containerX}>
          <br />
          <Router history={hist}>
            <Switch>
              <Route path="/student/:id/feed/:id" component={FeedSection} />
              <Route path="/" component={ClassListSection} />
            </Switch>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default StudentPage
