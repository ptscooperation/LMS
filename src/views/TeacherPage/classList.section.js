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
  //const [Details, setDetails] = useState([])

  const ID = props.location.pathname.split('/teacher/')[1]

  var CardSectionList
  const List = []
  useEffect(() => {
    function fetchPart(id) {
      axios
        .get('http://clz-api.vercel.app/api/teacher/classlist/' + id, {
          headers: authHeader(),
        })
        .then(res => {
          //console.log('ClassList-API-response: ' + res.data
          setResData(res.data)
        })
        .catch(err => {
          console.log('Error from classlist')
        })
    }
    fetchPart(ID)
  }, [ID])

  ResData.map(_class =>
    _class.teacher_class.map(_id => {
      axios
        .get('http://clz-api.vercel.app/api/teacher/classdetails/' + _id, {
          headers: authHeader(),
        })
        .then(res => {
          List.push(res.data)
        })
        .catch(err => {
          console.log('Error from classdetails ', err)
        })
    }),
  )
  
  if (!List) {
    CardSectionList = 'Classes is not availabe'
  } else {
    CardSectionList = List.map(element =>
      element.map(vale => <CardComponent data={vale} />),
    )
  }

  return (
    <div className={classes.root}>
      <h1>
        Hello..!!! Teacher {props.location.pathname} --{' '}
        {props.location.pathname.split('/teacherprofile/')[1]} --{' '}
        {props.location.pathname.split('/teacher/')[1]} 🉐
      </h1>
      {CardSectionList}
    </div>
  )
}
