import React, { useEffect } from 'react'
import {
  Switch, Route, Redirect
} from 'react-router-dom'
import { login } from './reducers/userReducer'
import { connect } from 'react-redux'

// pages
import Register from './pages/Signup'
import SignIn from './pages/Signin'
import IniTracker from './pages/IniTracker'
import UserSettings from './pages/UserSettings'

// components
import Navigation from './components/Navigation'
import initrackerService from './services/initrackerService'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
  }
}))


const App = (props) => {

  const effectLogin = props.login

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      if (userObject !== null) {
        effectLogin(userObject)
        initrackerService.setToken(userObject.token)
      }
    }
  }, [effectLogin])



  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Navigation>
        <Container maxWidth='lg' className={classes.root}>
          <Switch>
            <Route path='/initracker'>
              <IniTracker />
            </Route>
            <Route path='/user_settings' render={() =>
              props.user === null ? <Redirect to='/signin' /> : <UserSettings />} />
            <Route path='/signup' render={() =>
              props.user !== null ? <Redirect to='/' /> : <Register />
            } />
            <Route path='/signin' render={() =>
              props.user !== null ? <Redirect to='/' /> : <SignIn />
            } />
            <Route path='/'>
              <h1>Home</h1>
            </Route>
          </Switch>
        </Container>
      </Navigation>
    </>
  );
}

const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectedApp
