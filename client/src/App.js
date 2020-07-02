import React, { useEffect, useState } from 'react'
import {
  useRouteMatch,
  Switch, Route, useHistory
} from 'react-router-dom'

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


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      setUser(userObject)
    }
  }, [])

  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Navigation user={user}>
        <Container maxWidth='lg' className={classes.root}>
          <Switch>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              <h1>Home</h1>
            </Route>
          </Switch>
        </Container>
      </Navigation>
    </>
  );
}

export default App
