import React, { useState } from 'react'
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
  gridItem: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '13.5px',
    },
  },
}))

export default function PickItSection(props) {
  const classes = useStyles()
  const [alert, setAlert] = useState()
  const [alertType, setAlertType] = useState()

  const [form, setValue] = useState({
    brand: '',
    modle: '',
    applicability: '',
    part_number: '',
    part_name: '',
    production_period: '',
    image_url: '',
    base_price: '',
  })

  const updateField = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const data = {
      part_number: props.match.params.partnumber,
      customer_name: form.customer_name,
      nic_number: form.nic_number,
      phone_number: form.phone_number,
      address: form.address,
      email: form.email,
      status_one: false,
      status_two: false,
      status_three: false,
    }
    axios
      .post('https://anjinz-api.vercel.app/api/customers', data)
      .then(res => {
        setValue({
          part_number: '',
          customer_name: '',
          nic_number: '',
          phone_number: '',
          address: '',
          email: '',
        })
        setAlertType('success')
        setAlert(res.status)
        props.history.push('/')
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
      >
        <Grid item className={classes.gridItem} xs={10} lg={12}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="part_number"
            label="Part number"
            defaultValue={`${props.match.params.partnumber}`}
            variant="filled"
            //value={form.brand}
            InputProps={{
              readOnly: true,
            }}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="customer_name"
            label="Name"
            variant="filled"
            value={form.customer_name}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="nic_number"
            label="NIC Number"
            variant="filled"
            value={form.nic_number}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="phone_number"
            label="Phone number"
            variant="filled"
            value={form.phone_number}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="address"
            label="Delivery address"
            variant="filled"
            value={form.address}
            onChange={updateField}
            fullWidth
            required
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="email"
            label="Email"
            variant="filled"
            value={form.email}
            onChange={updateField}
            fullWidth
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
