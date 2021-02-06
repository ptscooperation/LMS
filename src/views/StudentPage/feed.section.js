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
import PostComponent from './post.component'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function FeedSection(props) {
  const classes = useStyles()

  const classID = props.location.pathname.split('/feed/')[1].split('/')[0]
  const studentID = props.location.pathname.split('/feed/')[1].split('/')[1]
  let PostList

  const payload = {
    student_uid: studentID,
    class_id: classID,
  }
  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .post('https://api.lms.pts.asia/api/student/feed', payload, {
        headers: authHeader(),
      })
      .then(res => res.data),
  )

  if (error) {
    console.log('Error from classlist')
  }

  if (!data) {
    if (isLoading) {
      PostList = loadMe()
    }
  } else {
    PostList = Object.values(data).map(value =>
      value.post_list.map(x => (
        <PostComponent
          //id={classID} history={props.history}
          data={x}
        />
      )),
    )
  }

  return (
    <div className={classes.root}>
      {/* <h2>
        classID {classID}
        <br />
        studentID {studentID}
        <br />
        <hr /> */}
      {PostList}
      {/* </h2> */}
    </div>
  )
}
