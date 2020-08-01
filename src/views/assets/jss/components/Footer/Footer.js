import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Favorite from '@material-ui/icons/Favorite'
import Typography from '../Typography/Typography.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right!important',
    textAlign: 'center',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={5} sm={4} md={2} lg={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/terms-page">Terms</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/privacy-page">Privacy</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={5} sm={4} md={2} lg={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Contact
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="mailto:info@taxilaradioclub.com">
                  info@taxilaradioclub.com
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link href="tel:+94-714 797 084">+94-714 797 084</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={5} sm={4} md={2} lg={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Location
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="https://goo.gl/maps/C35BPTyd6PXqi3e28" target="blank">
                  Taxila Central College <br></br>Horana
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} lg={12}>
            <div className={classes.right}>
              <Typography variant="caption">
                &copy; {1900 + new Date().getYear()} , made with{' '}
                <Favorite className={classes.icon_} /> by{' '}
                <Link href="https://github.com/ebonynon" target="blank">
                  xe-non
                </Link>{' '}
                for a better web.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}
