import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import loadMe from '../assets/jss/loadGIF'

import StudnetListComponent from './studentList.component'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function StudentListSection(props) {
  const classes = useStyles()

  const ID = props.location.pathname.split('/studentlist/')[1]
  var StudentListTable

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('https://api.lms.pts.asia/api/teacher/studentlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data),
  )

  if (error) {
    console.log('Error from studentlist')
  }

  if (!data) {
    if (isLoading) {
      StudentListTable = loadMe()
    }
  } else {
    StudentListTable = Object.values(data.student_list).map(value => (
      <StudnetListComponent
        student_uid={value.student_uid}
        student_payday={value.student_payday}
        id={ID}
      />
    ))
  }

  return <div className={classes.root}>{StudentListTable}</div>
}
