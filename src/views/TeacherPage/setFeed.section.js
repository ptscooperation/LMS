import React, { useState } from 'react'
import axios from 'axios'
import authHeader from '../assets/jss/services/auth-header'
import marked from 'marked'
import ISimpleMDE from 'react-simplemde-v1'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import 'simplemde/dist/simplemde.min.css'

export default function SetFeedSection(props) {
  const [textValue, setTextValue] = useState('')
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()

  const ID = props.location.pathname.split('/classfeed/')[1]

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

  return (
    <div
    //className={classes.root}
    >
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
      <br />
      <br />
      <br />
      <div dangerouslySetInnerHTML={getMarkdownText()} />
    </div>
  )
}
