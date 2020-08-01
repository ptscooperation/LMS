import React from 'react'
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
/////import CardSection from "./Sections/CardSection.js"
import Header from './header.section'

const useStyles = makeStyles(teacherPageStyles)

function teacherPage(props) {
  const classes = useStyles()

  return (
    <div>
      <Header />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* <SearchSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default teacherPage
