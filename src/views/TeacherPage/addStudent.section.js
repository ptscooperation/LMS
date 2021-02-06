import React, { useState } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import authHeader from '../assets/jss/services/auth-header'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
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

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

export default function AddStudentSection(props) {
  const classes = useStyles()

  const [form, setValue] = useState({
    student_uid: '',
    student_uid_s: '',
  })
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()
  const [alert_, setAlert_] = useState()
  const [alertType_, setAlertType_] = useState()
  const [ResData, setResData] = useState([])
  const [state, setState] = useState({
    checkedOne: false,
    paymentDate: new Date(2008, 1, 22),
  })
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
      .post(`https://api.lms.pts.asia/api/teacher/addstudent`, data, {
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

    const _data = {
      class_id: ID,
      student_uid: form.student_uid_s,
    }
    axios
      .post(`https://api.lms.pts.asia/api/teacher/searchstudent`, _data, {
        headers: authHeader(),
      })
      .then(res => {
        setResData(res.data)
      })
      .catch(err => {
        console.log('Error in SearchStudent!')
      })
  }

  const handleChangeOne = event => {
    const __data = {
      class_id: ID,
      student_uid: form.student_uid_s,
    }
    axios
      .post(`https://api.lms.pts.asia/api/teacher/studentfee`, __data, {
        headers: authHeader(),
      })
      .then(res => {
        setValue({
          student_uid_s: '',
        })
        setAlertType_('success')
        setAlert_(res.status)
        setState({ checkedOne: true })
      })
      .catch(err => {
        setAlertType_('error')
        setAlert_(err.message)
        console.log('Error in UpdateFree!')
      })
  }

  var StudentDetails
  const oneDay = 24 * 60 * 60 * 1000
  var present_date = new Date()

  if (!ResData) {
    StudentDetails = 'Student was not added'
  } else {
    StudentDetails = ResData.map(val =>
      val.student_list.map(x => (
        <TableContainer component={Paper}>
          <Table aria-label="fee table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <FormLabel>{x.student_uid}</FormLabel>
                </TableCell>
                <TableCell align="left">
                  <FormLabel>{x.student_name}</FormLabel>
                </TableCell>
                <TableCell align="left">
                  <FormLabel>{x.student_payday}</FormLabel>
                </TableCell>
                <TableCell align="left">
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        //checked={state.checkedOne}
                        checked={
                          !(
                            Math.round(
                              Math.abs(
                                (present_date - new Date(x.student_payday)) / oneDay,
                              ),
                            ) >= 30
                          ) || state.checkedOne
                        }
                        onChange={handleChangeOne}
                        name="checkedOne"
                      />
                    }
                    label="Paid"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )),
    )
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
        <Alert severity={`${alertType_}`}>{alert_}</Alert>
      </Grid>
    </div>
  )
}
