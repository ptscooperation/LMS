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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function FeedSection(props) {
  const classes = useStyles()

  const classID = props.location.pathname.split('/feed/')[1]
  const studentID = props.location.pathname.match('/student/(.*)/feed/')[1]
  let PostList

  const payload = {
    student_uid: studentID,
    class_id: classID,
  }
  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .post('https://clz-api.vercel.app/api/student/feed', payload, {
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
    // CardSectionList = Object.values(data).map(value => (
    //   <CardComponent id={ID} history={props.history} data={value} />
    // ))
    // if (data.arrears) {
    //   PostList = 'You was not pay for this month..!!!'
    // } else {
    //   PostList = `student_payday :: ${data.student_list.student_list}
    //   <br /> `
    //   console.log(data)
    // }
    Object.values(data).map(value =>
      value.student_list.map(
        x =>
          (PostList = `Pay Day : ${x.student_payday} UID : ${x.student_uid}`),
      ),
    )
  }

  return (
    <div>
      <h2>
        classID {classID}
        <br />
        studentID {studentID}
        <br />
        <hr />
        {PostList}
      </h2>
    </div>
  )
}
