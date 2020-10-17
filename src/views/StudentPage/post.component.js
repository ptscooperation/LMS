import React from 'react'
import marked from 'marked'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
////import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
////import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
// @material-ui/icons
////import EditIcon from '@material-ui/icons/Edit'
////import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    maxWidth: 345,
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
}))

export default function PostComponent(props) {
  const classes = useStyles()
  //  const ID = props.id
  const Data = props.data
  //  const History = props.history

  const getMarkdownText = () => {
    var rawMarkup = marked(Data, { sanitize: true })
    return { __html: rawMarkup }
  }

  return (
    <Grid item xs={12} lg={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <div dangerouslySetInnerHTML={getMarkdownText()} />
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <IconButton
            color="inherit"
            aria-label="Edit the post"
            title="Edit the post"
            onClick={() => {
              History.push(`/teacher/${ID}/classfeed/${Data._id}/editpost`)
              window.location.reload()
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Delete the post"
            title="Delete the post"
            onClick={() => {
              History.push(`/teacher/${ID}/classfeed/${Data._id}/deletepost`)
              window.location.reload()
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    </Grid>
  )
}
