import React, { useState } from 'react'
// @material-ui/core components
import AuthService from '../assets/jss/services/auth.service'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
////import Card from '@material-ui/core/Card'
////import CardActionArea from '@material-ui/core/CardActionArea'
////import CardMedia from '@material-ui/core/CardMedia'
// @material-ui/icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// core components
// Images
////import LogoImg from '../assets/img/300Logo.png'
////import LogoImgTwo from '../assets/img/juventus-logo.gif'
import LogoImgThree from '../assets/img/logo-2.png'
import LogoImgFour from '../assets/img/logo-javascript.png'

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
    float: 'center!important',
    minWidth: '300px',
    [theme.breakpoints.down('md')]: {
      //paddingRight: '16px',
      //marginRight: '85px',
    },
    [theme.breakpoints.down('sm')]: {
      //marginLeft: '13.5px',
      minWidth: '280px',
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      //marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      //marginLeft: '13.5px',
    },
  },
  grid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '7%',
      //margin: theme.spacing(2),
    },
  },
  media: {
    height: 140,
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

  const [checked, setChecked] = useState(false)

  const toggleChecked = () => {
    setChecked(prev => !prev)
  }
  const updateField = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    setValue({ message: '', alert: '' })

    if (checked) {
      AuthService.loginTeacher(form.username, form.password).then(
        response => {
          setValue({ message: '', alert: 'success' })
          props.history.push(`/teacher/${response.user._id}`)
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
    } else {
      AuthService.loginStudent(form.username, form.password).then(
        response => {
          setValue({ message: '', alert: 'success' })
          //console.log('ID MY:: ', response)
          props.history.push(`/student/${response.user._id}`)
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
  }

  const onSinup = e => {
    e.preventDefault()

    if (checked) {
      props.history.push('/signup-teacher')
      window.location.reload()
    } else {
      props.history.push('/signup-student')
      window.location.reload()
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item className={classes.gridItem}>
          <Hidden smDown implementation="css">
            <img src={LogoImgThree} alt="Logo" />
          </Hidden>
          <Hidden smUp implementation="css">
            <img src={LogoImgFour} alt="Logo" />
          </Hidden>
        </Grid>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="button" display="block" gutterBottom>
              Student
            </Typography>
          </Grid>
          <Grid item>
            <Switch size="medium" checked={checked} onChange={toggleChecked} />
          </Grid>
          <Grid item>
            <Typography variant="button" display="block" gutterBottom>
              Teacher
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem} xs={10} lg={5}>
          {/* <img src={LogoImg} /> 
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={LogoImg}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>*/}

          <TextField
            //className={classes.textField}
            id="outlined-basic"
            name="username"
            label="Email"
            variant="filled"
            value={form.username}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            //className={classes.textField}
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
            size="large"
            //fullWidth={true}
          >
            Login
          </Button>
          <br />
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={onSinup}
            size="large"
            //fullWidth={true}
          >
            Signup
          </Button>
        </Grid>
        <Alert severity={`${form.alert}`}>{form.message}</Alert>
      </Grid>
    </div>
  )
}

export default LoginPage
