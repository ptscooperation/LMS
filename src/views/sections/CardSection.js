import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Lightbox from 'react-image-lightbox'
// @material-ui/icons
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// core components

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    maxWidth: 345,
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  media: {
    height: 140,
  },
}))

export default function CardSection(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [Image, setImage] = React.useState({ isOpen: false })
  const { isOpen } = Image
  const part = props.part

  const share = async () => {
    try {
      await navigator.share({
        title: `${part.part_number}`,
        text: `${part.part_name}`,
        url: `/part/${part._id}`,
      })
      console.log('Thanks for sharing!')
    } catch (err) {
      console.log(`Couldn't share because of`, err)
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  function createData(prop, val) {
    return { prop, val }
  }

  const rows = [
    createData('Brand', `${part.brand}`),
    createData('Modle', `${part.modle}`),
    createData('Applicability', `${part.applicability}`),
    createData('OEM part number', `${part.part_number}`),
    createData('Production period', `${part.production_period}`),
  ]

  return (
    <Grid item xs={12} lg={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${part.image_url}`}
            onClick={() => setImage({ isOpen: true })}
            title={`${part.part_name}`}
          />
          {isOpen && (
            <Lightbox
              mainSrc={`${part.image_url}`}
              onCloseRequest={() => setImage({ isOpen: false })}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {part.part_number}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {part.part_name}
            </Typography>
            <Typography variant="h6" color="secondary" component="p">
              {part.base_price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href={`/pickpart/${part.part_number}`}>
            <Button size="small" color="primary">
              Pick it
            </Button>
          </Link>
          <IconButton aria-label="share" onClick={share}>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Link href={`/part/${part._id}`}>
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
            </Link>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}
