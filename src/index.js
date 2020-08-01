import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// core components
import Header from './components/Header/Header.js' // ⛳
import Footer from './components/Footer/Footer.js' // ⛳
import Parallax from './components/Parallax/Parallax.js'
// CSS components
import mainPageStyles from './assets/css/_views/mainPageStyle.js'
import './assets/css/bootstrap.min.css'
import 'raw-loader!css-loader!react-image-lightbox/style.css'
// Images
import bannerImg from './assets/img/Car-Parts.jpg'
// Sections for this page
import SearchSection from './Sections/SearchSection.js'
import AddPartSection from './Sections/AddPartSection.js'
import ShowPartSection from './Sections/ShowPartSection.js'
import SignupSection from './Sections/SignupSection.js'
import LoginSection from './Sections/LoginSection.js'
import PickItSection from './Sections/PickItSection.js'
import DashboardSection from './Sections/DashboardSection.js'
import ViewCustomerSection from './Sections/ViewCustomerSection.js'
// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './Sections/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const useStyles = makeStyles(mainPageStyles)
var hist = createBrowserHistory()

function MainPage(params) {
  const classes = useStyles()
  return (
    <div>
      <Header />
      <Parallax filter image={bannerImg}>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h4">
                There is sometimes an incorrect assumption that the parser itself is
                what of ESLint with TypeScript.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Router history={hist}>
            <Switch>
              <Route path="/signup" component={SignupSection} />
              <Route path="/login" component={LoginSection} />
              <Route path="/dashboard/:id" component={ViewCustomerSection} />
              <Route path="/dashboard" component={DashboardSection} />
              <Route path="/pickpart/:partnumber" component={PickItSection} />
              <Route path="/part/:id" component={ShowPartSection} />
              <Route path="/add-part" component={AddPartSection} />
              <Route path="/" component={SearchSection} />
            </Switch>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root'),
)
