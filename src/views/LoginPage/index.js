import React, { useState } from 'react'
// @material-ui/core components
import AuthService from '../assets/jss/services/auth.service'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
// @material-ui/icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// core components

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      width: '97ch',
    },
    //width: "97ch",
  },
  button: {
    margin: theme.spacing(1),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'right!important',
    [theme.breakpoints.down('md')]: {
      paddingRight: '16px',
      marginRight: '85px',
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '13.5px',
    },
  },
}))

function LoginPage(props) {
  const classes = useStyles()

  const [form, setValue] = useState({
    username: '',
    password: '',
    alert: '',
    message: '',
  })

  const updateField = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    setValue({ message: '', alert: '' })

    AuthService.login(form.username, form.password).then(
      response => {
        setValue({ message: response.data.message, alert: 'success' })
        props.history.push('/')
        window.location.reload()
      },
      error => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setValue({
          alert: 'error',
          message: resMessage,
        })
      },
    )
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item className={classes.gridItem} xs={10} lg={12}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="username"
            label="Username"
            variant="filled"
            value={form.username}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="password"
            label="Password"
            type="password"
            variant="filled"
            value={form.password}
            onChange={updateField}
            fullWidth
            required
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={onSubmit}
          >
            Login
          </Button>
        </Grid>
        <Alert severity={`${form.alert}`}>{form.message}</Alert>
      </Grid>
    </div>
  )
}

export default LoginPage
