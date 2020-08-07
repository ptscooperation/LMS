import React, { useState, useEffect } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
//import Grid from '@material-ui/core/Grid'
// @material-ui/icons
// core components
import CardComponent from './card.component'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function ClassListSection(props) {
  const classes = useStyles()
  const [ResData, setResData] = useState([])

  const ID = props.location.pathname.split('/teacher/')[1]
  var CardSectionList

  useEffect(() => {
    function fetchPart(id) {
      axios
        .get('http://clz-api.vercel.app/api/teacher/classlist/' + id, {
          headers: authHeader(),
        })
        .then(res => {
          setResData(res.data.teacher_class)
        })
        .catch(err => {
          console.log('Error from classlist')
        })
    }
    fetchPart(ID)
  }, [ID])

  if (!ResData) {
    CardSectionList = 'Classes is not availabe'
  } else {
    CardSectionList = Object.values(ResData).map(value => (
      <CardComponent data={value} />
    ))
  }

  return <div className={classes.root}>{CardSectionList}</div>
}
