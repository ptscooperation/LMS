import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import authHeader from '../assets/jss/services/auth-header'
import loadMe from '../assets/jss/loadGIF'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function StudentListSection(props) {
  const classes = useStyles()

  const ID = props.location.pathname.split('/studentlist/')[1]
  var StudentListTable
  const oneDay = 24 * 60 * 60 * 1000
  var present_date = new Date()

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('https://clz-api.vercel.app/api/teacher/studentlist/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data),
  )

  if (error) {
    console.log('Error from studentlist')
  }

  if (!data) {
    if (isLoading) {
      StudentListTable = loadMe()
    }
  } else {
    function pay(day) {
      console.log(Math.round(Math.abs((present_date - new Date(day)) / oneDay)))
      if (Math.round(Math.abs((present_date - new Date(day)) / oneDay)) < 30) {
        return 'Paid'
      } else {
        return 'Not Paid'
      }
    }
    StudentListTable = Object.values(data.student_list).map(value => (
      <TableContainer component={Paper}>
        <Table aria-label="fee table">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <FormLabel>{value.student_uid}</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.student_payday}</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{pay(value.student_payday)}</FormLabel>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ))
  }

  return <div className={classes.root}>{StudentListTable}</div>
}
