import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
// @material-ui/icons
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
  const Data = props.data

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
          <Link>
            <Button size="small" color="primary">
              Pick it
            </Button>
          </Link>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
