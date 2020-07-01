import React from 'react'
import {
  useRouteMatch,
  Switch, Route, Link, useHistory
} from 'react-router-dom'

// pages and components
import Register from './pages/Register'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    bgcolor: 'green'
  }
}))



const Menu = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
}

const App = () => {
  const classes = useStyles
  return (
    <>
      <CssBaseline />
      <Container bgcolor='green' maxWidth='lg'>
        <Menu />
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/'>
            <h1>Home</h1>
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App
