import React, { useState, useEffect } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
// @material-ui/icons
import SendIcon from '@material-ui/icons/Send'
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
  grid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '4%',
      marginLeft: '4%',
      //marginLeft: '7.27%',
      //margin: theme.spacing(3),
      //margin: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '35px',
      //paddingLeft: '10px',
      //marginLeft: '20px',
      //marginRight: '0%',
      //margin: theme.spacing(2),
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

export default function AddClassSection(props) {
  const classes = useStyles()
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()
  const [ResData, setResData] = useState([])
  const ID = props.location.pathname.split('/addclass/')[1]

  const [form, setValue] = useState({
    subject: '',
    grade: '',
    class_date: '',
    class_time: '',
  })

  useEffect(() => {
    function fetchPart(id) {
      axios
        .get('http://localhost:8082/api/teacher/NI/' + id)
        .then(res => {
          //console.log('ViewCustomerSection-API-response: ' + res.map())
          setResData(res.data)
        })
        .catch(err => {
          console.log('Error from ViewCustomerSection')
        })
    }
    fetchPart(ID)
  }, [ID])

  const updateField = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const data = {
      subject: form.subject,
      grade: form.grade,
      class_date: form.class_date,
      class_time: form.class_time,
      teacher_id: ID,
      teacher_name: ResData.map(teacher => teacher.teacher_name).toString(),
      institute_name: ResData.map(teacher => teacher.institute_name).toString(),
    }

    axios
      .post('http://localhost:8082/api/teacher/addclass', data)
      .then(res => {
        setValue({
          subject: '',
          grade: '',
          class_date: '',
          class_time: '',
        })
        setAlertType('success')
        setAlert(res.status)
        props.history.push(`/teacher/${ID}`)
      })
      .catch(err => {
        setAlertType('error')
        setAlert(err.message)
        console.log('Error in submission!')
      })
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.grid}
      >
        <Grid item className={classes.gridItem} xs={10} lg={12}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="subject"
            label="Subject"
            variant="filled"
            value={form.subject}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="grade"
            label="Grade"
            variant="filled"
            value={form.grade}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="class_date"
            label="Date"
            variant="filled"
            value={form.class_date}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="class_time"
            label="Time"
            variant="filled"
            value={form.class_time}
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
            startIcon={<SendIcon />}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Alert severity={`${alertType}`}>{alert}</Alert>
      </Grid>
    </div>
  )
}
