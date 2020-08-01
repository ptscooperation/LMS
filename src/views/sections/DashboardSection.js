import React, { useState, useEffect } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors'
import { yellow } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

export default function DashboardSection(props) {
  const classes = useStyles()
  const [ResData, setResData] = useState([])

  useEffect(() => {
    function fetchCustomers(props) {
      axios
        .get('https://anjinz-api.vercel.app/api/customers')
        .then(res => {
          console.log('DashboardSection-API-response: ' + res.data)
          setResData(res.data)
        })
        .catch(err => {
          console.log('Error from DashboardSection')
        })
    }
    fetchCustomers(props)
  }, [props])

  console.log('XX :: ', ResData)

  var TableRowList

  if (!ResData) {
    TableRowList = 'there is no customers recored!'
  } else {
    TableRowList = ResData.map((customer, k) => (
      <TableRowCustomer customer={customer} key={k} />
    ))
  }

  //  const cccc = ResData.map(customer);
  //  console.log("CUST :: ", cccc);
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
              <TableBody>{TableRowList}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

function TableRowCustomer(props) {
  const _customer = props.customer

  const [state, setState] = React.useState({
    checkedOne: _customer.status_one,
    checkedTwo: _customer.status_two,
    checkedThree: _customer.status_three,
  })

  const handleChangeOne = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
    const dataOne = { status_one: !state.checkedOne }
    Axios(dataOne)
  }

  const handleChangeTwo = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
    const dataTwo = { status_two: !state.checkedTwo }
    Axios(dataTwo)
  }

  const handleChangeThree = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
    const dataThree = { status_three: !state.checkedThree }
    Axios(dataThree)
  }

  function Axios(Data) {
    axios
      .put('https://anjinz-api.vercel.app/api/customers/' + _customer._id, Data)
      .then(res => {})
      .catch(err => {
        console.log('Error in TableRow!')
      })
  }

  function createData(nic_number, customer_name) {
    return {
      nic_number,
      customer_name,
    }
  }

  const rows = [createData(`${_customer.nic_number}`, `${_customer.customer_name}`)]

  return rows.map(row => (
    <TableRow key={row.name}>
      <TableCell align="left">
        <FormLabel>{row.nic_number}</FormLabel>
      </TableCell>
      <TableCell align="left">
        <Link href={`/dashboard/${_customer._id}`}>
          <FormLabel>{row.customer_name}</FormLabel>
        </Link>
      </TableCell>
      <TableCell align="left">
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedOne}
              onChange={handleChangeOne}
              name="checkedOne"
            />
          }
          label="Noted"
        />
      </TableCell>
      <TableCell align="left">
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={state.checkedTwo}
              onChange={handleChangeTwo}
              name="checkedTwo"
            />
          }
          label="Ordered"
        />
      </TableCell>
      <TableCell align="left">
        <FormControlLabel
          control={
            <RedCheckbox
              checked={state.checkedThree}
              onChange={handleChangeThree}
              name="checkedThree"
            />
          }
          label="Delivered"
        />
      </TableCell>
    </TableRow>
  ))
}
