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
// @material-ui/icons
// core components

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function StudentProfileSection(props) {
  const classes = useStyles()

  const ID = props.location.pathname.split('/studentprofile/')[1]
  var CardSectionList

  const { isLoading, error, data } = useQuery('repoData', () =>
    axios
      .get('https://clz-api.vercel.app/api/student/studentprofile/' + ID, {
        headers: authHeader(),
      })
      .then(res => res.data),
  )

  if (error) {
    console.log('Error from classlist')
  }

  if (!data) {
    if (isLoading) {
      CardSectionList = loadMe()
    }
  } else {
    CardSectionList = Object.values(data).map(value => (
      <TableContainer component={Paper}>
        <Table aria-label="fee table">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <FormLabel>Name</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.student_name}</FormLabel>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <FormLabel>School</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.school}</FormLabel>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <FormLabel>DoB</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.bod}</FormLabel>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <FormLabel>Phone Number</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.student_phone_number}</FormLabel>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <FormLabel>Email</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.student_email}</FormLabel>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <FormLabel>UID</FormLabel>
              </TableCell>
              <TableCell align="left">
                <FormLabel>{value.student_uid}</FormLabel>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    ))
  }

  return <div className={classes.root}>{CardSectionList}</div>
}
