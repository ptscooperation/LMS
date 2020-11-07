import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import loadMe from '../assets/jss/loadGIF'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function StudentListSection(props) {
  const ID = props.location.pathname.split('/studentlist/')[1]

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('http://localhost:8082/api/teacher/studentlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data),
  )

  if (error) {
    console.log('Error from studentlist')
  }

  if (!data) {
    if (isLoading) {
      CardSectionList = loadMe()
    }
  } else {
    console.log(data)
  }

  return <h1>Working</h1>
}
