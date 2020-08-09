import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import loadMe from '../assets/jss/loadGIF'
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

  const ID = props.location.pathname.split('/student/')[1]
  var CardSectionList

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('http://localhost:8082/api/student/classlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data.student_class),
  )

  if (error) {
    console.log('Error from classlist')
  }

  if (!data) {
    if (isLoading) {
      CardSectionList = loadMe()
    }
  } else {
    CardSectionList = Object.values(data).map(value => (
      <CardComponent id={ID} history={props.history} data={value} />
    ))
  }

  return <div className={classes.root}>{CardSectionList}</div>
}
