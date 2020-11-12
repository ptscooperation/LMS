import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import FormLabel from '@material-ui/core/FormLabel'

export default function StudnetListComponent(props) {
  const student_uid = props.student_uid
  const student_payday = props.student_payday
  const oneDay = 24 * 60 * 60 * 1000
  var present_date = new Date()
  function pay(day) {
    if (Math.round(Math.abs((present_date - new Date(day)) / oneDay)) < 30) {
      return 'Paid'
    } else {
      return 'Not Paid'
    }
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
