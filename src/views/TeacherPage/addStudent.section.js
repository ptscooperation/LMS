import React, { useState } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import { fromUnixTime } from 'date-fns'
// core components
////import StudentDetailsTable from './studentdetailstable.component'

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
    //float: 'right!important',
    [theme.breakpoints.down('md')]: {
      paddingRight: '16px',
      marginRight: '85px',
    },
  },
  gridItem: {
    [theme.breakpoints.down('md')]: {
      //marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      //marginLeft: '13.5px',
      marginRight: '13.5px',
    },
  },
}))

export default function AddStudentSection(props) {
  const classes = useStyles()

  const [form, setValue] = useState({
    student_uid: '',
    student_uid_s: '',
  })
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()
  const [ResData, setResData] = useState([])
  const ID = props.location.pathname.split('/addstudent/')[1]

  const updateField = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onAdd = e => {
    e.preventDefault()

    const data = {
      class_id: ID,
      student_uid: form.student_uid,
    }
    console.log('D :: ', data)
    axios
      .post(`https://clz-api.vercel.app/api/teacher/addstudent`, data, {
        headers: authHeader(),
      })
      .then(res => {
        setValue({
          student_uid: '',
        })
        setAlertType('success')
        setAlert(res.status)
      })
      .catch(err => {
        setAlertType('error')
        setAlert(err.message)
        console.log('Error in AddStudent!')
      })
  }

  const onSearch = e => {
    e.preventDefault()

    axios
      .get(`http://localhost:8082/api/teacher/searchstudent/` + form.student_uid_s, {
        headers: authHeader(),
      })
      .then(res => {
        setResData(res.data)
      })
      .catch(err => {
        console.log('Error in SearchStudent!')
      })
  }

  var StudentDetails

  if (!ResData) {
    StudentDetails = 'Student was not added'
  } else {
    // StudentDetails = ResData.map((part, index) => (
    //   <StudentDetailsTable part={part} key={index} />
    // ))
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.gridItem} xs={12} lg={12}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="student_uid"
            label="Add a student"
            variant="filled"
            value={form.student_uid}
            onChange={updateField}
            fullWidth
          />
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add
          </Button>
          <Alert severity={`${alertType}`}>{alert}</Alert>
        </Grid>
        <Grid item className={classes.gridItem} xs={12} lg={12}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="student_uid_s"
            label="Search student"
            variant="filled"
            value={form.student_uid_s}
            onChange={updateField}
            fullWidth
          />
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={onSearch}
          >
            Search
          </Button>
        </Grid>
        {StudentDetails}
      </Grid>
    </div>
  )
}
