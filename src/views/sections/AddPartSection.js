import React, { useState } from 'react'
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
// @material-ui/icons
import AddIcon from '@material-ui/icons/Add'
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

export default function AddPartSection() {
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
      brand: form.brand,
      modle: form.modle,
      applicability: form.applicability,
      part_number: form.part_number,
      part_name: form.part_name,
      production_period: form.production_period,
      image_url: form.image_url,
      base_price: form.base_price,
    }
    axios
      .post('https://anjinz-api.vercel.app/api/parts', data)
      .then(res => {
        setValue({
          brand: '',
          modle: '',
          applicability: '',
          part_number: '',
          part_name: '',
          production_period: '',
          image_url: '',
          base_price: '',
        })
        setAlertType('success')
        setAlert(res.status)
        //this.props.history.push("/");
      })
      .catch(err => {
        setAlertType('error')
        setAlert(err.message)
        console.log('Error in AddPart!')
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
            name="brand"
            label="Brand"
            variant="filled"
            value={form.brand}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="modle"
            label="Modle"
            variant="filled"
            value={form.modle}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="applicability"
            label="Applicability"
            variant="filled"
            value={form.applicability}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="part_number"
            label="Part number"
            variant="filled"
            value={form.part_number}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="part_name"
            label="Part name"
            variant="filled"
            value={form.part_name}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="production_period"
            label="Production period"
            variant="filled"
            value={form.production_period}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="image_url"
            label="Image URL"
            variant="filled"
            value={form.image_url}
            onChange={updateField}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            name="base_price"
            label="Base price"
            variant="filled"
            value={form.base_price}
            onChange={updateField}
            fullWidth
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={onSubmit}
          >
            Add
          </Button>
        </Grid>
        <Alert severity={`${alertType}`}>{alert}</Alert>
      </Grid>
    </div>
  )
}
