import React, { useState } from 'react'
import axios from 'axios'
import authHeader from '../assets/jss/services/auth-header'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Alert from '@material-ui/lab/Alert'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

export default function StudnetListComponent(props) {
  const [alert_, setAlert_] = useState()
  const [alertType_, setAlertType_] = useState()
  const [state, setState] = useState({
    checkedOne: false,
    paymentDate: new Date(2008, 1, 22),
  })

  const student_uid = props.student_uid
  const student_payday = props.student_payday
  const ID = props.id

  const oneDay = 24 * 60 * 60 * 1000
  var present_date = new Date()

  function pay(day) {
    if (Math.round(Math.abs((present_date - new Date(day)) / oneDay)) < 30) {
      return 'Paid'
    } else {
      return 'Not Paid'
    }
  }

  const handleChangeOne = event => {
    const __data = {
      class_id: ID,
      student_uid: student_uid,
    }
    axios
      .post(`https://api.lms.pts.asia/api/teacher/studentfee`, __data, {
        headers: authHeader(),
      })
      .then(res => {
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="fee table">
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <FormLabel>{student_uid}</FormLabel>
            </TableCell>
            <TableCell align="left">
              <FormLabel>{student_payday}</FormLabel>
            </TableCell>
            <TableCell align="left">
              <FormLabel>{pay(student_payday)}</FormLabel>
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
                            (present_date - new Date(student_payday)) / oneDay,
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
            <TableCell align="left">
              <FormLabel>
                <Alert severity={`${alertType_}`}>{alert_}</Alert>
              </FormLabel>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
