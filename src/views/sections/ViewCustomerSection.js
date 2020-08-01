import React, { useState, useEffect } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
//#import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
// @material-ui/icons
// core components

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function ViewCustomerSection(props) {
  const classes = useStyles()
  const [ResData, setResData] = useState([])

  useEffect(() => {
    function fetchPart(props) {
      axios
        .get('https://anjinz-api.vercel.app/api/customers/' + props.match.params.id)
        .then(res => {
          console.log('ViewCustomerSection-API-response: ' + res.data)
          setResData(res.data)
        })
        .catch(err => {
          console.log('Error from ViewCustomerSection')
        })
    }
    fetchPart(props)
  }, [props])

  function createData(prop, val) {
    return { prop, val }
  }

  const rows = [
    createData('OEM part number', `${ResData.part_number}`),
    createData('Customer name', `${ResData.customer_name}`),
    createData('NIC Number', `${ResData.nic_number}`),
    createData('Phone number', `${ResData.phone_number}`),
    createData('Delivery address', `${ResData.address}`),
    createData('Email', `${ResData.email}`),
    // createData("Base price", `${ResData.base_price}`),
  ]

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="part table">
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.prop}</TableCell>
                    <TableCell align="right">{row.val}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}
