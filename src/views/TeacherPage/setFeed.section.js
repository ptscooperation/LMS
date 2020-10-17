import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import loadMe from '../assets/jss/loadGIF'
import marked from 'marked'
import ISimpleMDE from 'react-simplemde-v1'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import 'simplemde/dist/simplemde.min.css'
// core components
import PostComponent from './post.component'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function SetFeedSection(props) {
  const classes = useStyles()

  const [textValue, setTextValue] = useState('')
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()

  const ID = props.location.pathname.split('/classfeed/')[1]
  var PostSectionList
  const option = {}

  const onReady = instance => console.log(instance.value())

  const onEvents = {
    change: function () {
      // the 'this' variable can get SimpleMDE instance
      console.log(this.value())
      setTextValue(this.value())
    },
  }

  const getMarkdownText = () => {
    var rawMarkup = marked(textValue, { sanitize: true })
    return { __html: rawMarkup }
  }

  const onPost = e => {
    e.preventDefault()

    const data = {
      class_id: ID,
      post_data: textValue,
    }
    console.log('D :: ', data)
    axios
      .post(`http://localhost:8082/api/teacher/addpost`, data, {
        headers: authHeader(),
      })
      .then(res => {
        setTextValue('')
        //setValue({
        //  student_uid: '',
        //})
        setAlertType('success')
        setAlert(res.status)
      })
      .catch(err => {
        setAlertType('error')
        setAlert(err.message)
        console.log('Error in AddStudent!')
      })
  }


  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('http://localhost:8082/api/teacher/postlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data.post_list),
  )
console.log(data)
  if (error) {
    console.log('Error from postlist')
  }

  if (!data) {
    if (isLoading) {
      PostSectionList = loadMe()
    }
  } else {
    PostSectionList = Object.values(data).map(value => (
      <PostComponent id={ID} history={props.history} data={value} />
    ))
  }

  return (
    <div className={classes.root}>
      <div dangerouslySetInnerHTML={getMarkdownText()} />
      <br />
      <ISimpleMDE
        option={option}
        text={'Hello World!!!'}
        onReady={onReady}
        onEvents={onEvents}
      />
      <Button
        variant="contained"
        color="default"
        //startIcon={<SearchIcon />}
        onClick={onPost}
      >
        Post
      </Button>
      <Alert severity={`${alertType}`}>{alert}</Alert>
      {PostSectionList}
    </div>
  )
}
