import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
//import Grid from '@material-ui/core/Grid'
// @material-ui/icons
// Images
import loadGIF from '../assets/img/Rolling.gif'
// core components
import CardComponent from './card.component'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function ClassListSection(props) {
  const classes = useStyles()

  const ID = props.location.pathname.split('/teacher/')[1]
  var CardSectionList

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('https://clz-api.vercel.app/api/teacher/classlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data.teacher_class),
  )

  if (error) {
    console.log('Error from classlist')
  }

  if (!data) {
    if (isLoading) {
      CardSectionList = (
        <center>
          <img src={loadGIF} alt="Loading" />
        </center>
      )
    }
  } else {
    CardSectionList = Object.values(data).map(value => (
      <CardComponent data={value} />
    ))
  }

  return <div className={classes.root}>{CardSectionList}</div>
}
