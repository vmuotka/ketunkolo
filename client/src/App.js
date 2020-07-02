import React, { useEffect } from 'react'
import {
  Switch, Route, Redirect
} from 'react-router-dom'
import { login } from './reducers/userReducer'
import { useDispatch, connect } from 'react-redux'

// pages and components
import Register from './pages/Register'
import Login from './pages/Login'
import Navigation from './components/Navigation'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
  }
}))


const App = (props) => {
  const dispatch = useDispatch()

  const effectLogin = props.login

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      dispatch(effectLogin(userObject))
    }
  }, [dispatch, effectLogin])



  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Navigation>
        <Container maxWidth='lg' className={classes.root}>
          <Switch>
            <Route path='/register' render={() =>
              props.user ? <Redirect to='/' /> : <Register />
            } />
            <Route path='/login' render={() =>
              props.user ? <Redirect to='/' /> : <Login />
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
