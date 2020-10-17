import React, { useState } from 'react'
import marked from 'marked'
import ISimpleMDE from 'react-simplemde-v1'
import Button from '@material-ui/core/Button'
import 'simplemde/dist/simplemde.min.css'

export default function SetFeedSection(props) {
  const [textValue, setTextValue] = useState('')
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
        //onClick={onPost}
      >
        Post
      </Button>
      <br />
      <br />
      <br />
      <div dangerouslySetInnerHTML={getMarkdownText()} />
    </div>
  )
}
