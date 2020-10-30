import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
////import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
////import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
// @material-ui/icons
import EditIcon from '@material-ui/icons/Edit'
import EmailIcon from '@material-ui/icons/Email'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import WebIcon from '@material-ui/icons/Web'
////import ShareIcon from '@material-ui/icons/Share'
// core components

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

export default function CardComponent(props) {
  const classes = useStyles()
  const ID = props.id
  const Data = props.data
  const History = props.history

  return (
    <Grid item xs={12} lg={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {Data.subject} | {Data.grade}
            </Typography>
            <Typography variant="h6" color="secondary" component="p">
              {Data.teacher_name} | {Data.institute_name}
            </Typography>
            <Typography variant="h6" color="secondary" component="p">
              {Data.class_date} | {Data.class_time}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <IconButton
            color="inherit"
            aria-label="Edit the class"
            title="Edit the class"
            onClick={() => {
              History.push(`/teacher/${ID}/editclass/${Data._id}`)
              window.location.reload()
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Send a Email"
            title="Send a Email"
            onClick={() => {
              History.push(`/teacher/${ID}/sendemail/${Data._id}`)
              window.location.reload()
            }}
          >
            <EmailIcon />
          </IconButton> */}
          <IconButton
            color="inherit"
            aria-label="Add student"
            title="Add student"
            onClick={() => {
              History.push(`/teacher/${ID}/addstudent/${Data._id}`)
              window.location.reload()
            }}
          >
            <PersonAddIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Class feed"
            title="Class feed"
            onClick={() => {
              History.push(`/teacher/${ID}/classfeed/${Data._id}`)
              window.location.reload()
            }}
          >
            <WebIcon />
          </IconButton>
          {/* <IconButton>
            <ShareIcon />
          </IconButton> */}
        </CardActions>
      </Card>
    </Grid>
  )
}
