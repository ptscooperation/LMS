import React, { useState } from 'react'
// @material-ui/core components
import AuthService from '../assets/jss/services/auth.service'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
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
      //width: '97ch',
    },
    //width: "97ch",
  },
  button: {
    margin: theme.spacing(1),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'center!important',
    [theme.breakpoints.down('md')]: {
      //paddingRight: '16px',
      //marginRight: '85px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '30%',
      minWidth: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '25.0%',
      //minWidth: '18%',
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      //marginLeft: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      //marginLeft: '13.5px',
    },
  },
  grid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '4%',
      marginLeft: '7.27%',
      //margin: theme.spacing(3),
      //margin: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      paddingLeft: '40px',
      //marginLeft: '20px',
      //marginRight: '0%',
      //margin: theme.spacing(2),
    },
  },
}))

function SignupPage(props) {
  const classes = useStyles()

  const [form, setValue] = useState({
    username: '',
    email: '',
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
    updateField(e)
    // this.setState({
    //   message: "",
    //   successful: false,
    // });
    setValue({ message: '', alert: '' })
    //this.form.validateAll();

    //if (this.checkBtn.context._errors.length === 0) {
    AuthService.register(form.username, form.email, form.password).then(
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
    //}
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={classes.grid}
      >
        <Grid item className={classes.gridItem} xs={10} lg={10}>
          <ValidatorForm
            //onSubmit={this.handleSubmit}
            onSubmit={updateField}
          >
            {/* <Input
            type="text"
            className="form-control"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required, vusername]}
          /> */}
            <TextField
              //className={classes.textField}
              id="outlined-basic"
              name="username"
              label="Username"
              variant="filled"
              value={form.username}
              onChange={updateField}
              fullWidth
              required
            />
            <TextValidator
              label="Email"
              //onChange={this.handleChange}
              onChange={updateField}
              name="email"
              value={form.email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
              variant="filled"
              fullWidth
              required
            />
            <TextValidator
              label="Password"
              //onChange={this.handleChange}
              onChange={updateField}
              name="password"
              type="password"
              value={form.password}
              validators={[
                'minNumber:6',
                'maxNumber:255',
                'matchRegexp:^[0-9]$',
                'required',
              ]}
              errorMessages={['this field is required']}
              variant="filled"
              fullWidth
              required
            />
            {/* <TextField
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
          /> */}
          </ValidatorForm>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={onSubmit}
            size="large"
          >
            Sinup
          </Button>
        </Grid>
        <Alert severity={`${form.alert}`}>{form.message}</Alert>
      </Grid>
    </div>
  )
}

export default SignupPage
