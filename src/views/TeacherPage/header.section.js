import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
////import ListItem from '@material-ui/core/ListItem'
import Hidden from '@material-ui/core/Hidden'
////import NoteAddIcon from '@material-ui/icons/NoteAdd'
/////import AccountCircleIcon from '@material-ui/icons/AccountCircle'
/////import AssessmentIcon from '@material-ui/icons/Assessment'
/////import ReceiptIcon from '@material-ui/icons/Receipt'

const drawerWidth = 82

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}))

export default function PersistentDrawerRight(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const ID = props.id
  const History = props.history

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.rootX}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => {
              History.push(`/teacher/${ID}`)
              window.location.reload()
            }}
            noWrap
            className={classes.title}
          >
            LMS
          </Typography>
          <Hidden mdUp implementation="js">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown implementation="css">
            {/* <IconButton
              color="inherit"
              aria-label="Bill"
              title="Bill"
              onClick={() => {
                History.push(`/teacher/${ID}/bill/${ID}`)
                window.location.reload()
              }}
            >
              <ReceiptIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Analytics"
              title="Analytics"
              onClick={() => {
                History.push(`/teacher/${ID}/analytics/${ID}`)
                window.location.reload()
              }}
            >
              <AssessmentIcon />
            </IconButton> */}
            <IconButton
              color="inherit"
              aria-label="Add a new class"
              title="Add a new class"
              onClick={() => {
                History.push(`/teacher/${ID}/addclass/${ID}`)
                window.location.reload()
              }}
            >
              <NoteAddIcon />
            </IconButton>
            {/* <IconButton
              color="inherit"
              aria-label="Profile"
              title="Profile"
              onClick={() => {
                History.push(`/teacher/${ID}/teacherprofile/${ID}`)
                window.location.reload()
              }}
            >
              <AccountCircleIcon />
            </IconButton>  */}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* <ListItem button>
            <IconButton
              color="inherit"
              aria-label="Bill"
              title="Bill"
              onClick={() => {
                History.push(`/teacher/${ID}/bill/${ID}`)
                window.location.reload()
              }}
            >
              <ReceiptIcon />
            </IconButton>
          </ListItem>{' '}
          <ListItem button>
            <IconButton
              color="inherit"
              aria-label="Analytics"
              title="Analytics"
              onClick={() => {
                History.push(`/teacher/${ID}/analytics/${ID}`)
                window.location.reload()
              }}
            >
              <AssessmentIcon />
            </IconButton>
          </ListItem>{' '}
          <ListItem button>
            <IconButton
              color="inherit"
              aria-label="Add a new class"
              title="Add a new class"
              onClick={() => {
                History.push(`/teacher/${ID}/addclass/${ID}`)
                window.location.reload()
              }}
            >
              <NoteAddIcon />
            </IconButton>
          </ListItem>{' '}
          <ListItem button>
            <IconButton
              color="inherit"
              aria-label="Profile"
              title="Profile"
              onClick={() => {
                History.push(`/teacher/${ID}/teacherprofile/${ID}`)
                window.location.reload()
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  )
}
