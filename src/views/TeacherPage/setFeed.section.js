import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

export default function SetFeedSection(props) {
  const handleChange = value => {
    this.setState({ mdeValue: value })
  }
  return <SimpleMDE onChange={handleChange} />
}
