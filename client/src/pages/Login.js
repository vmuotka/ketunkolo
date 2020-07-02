import React from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Project components
import PasswordField from '../components/PasswordField'
import userService from '../services/userService'

// reducer functions
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'table',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  }
}))

const Login = () => {
  const username = useField('username', 'text')
  const password = useField('password', 'password')

  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loginInfo = {
        username: username.attributes.value,
        password: password.attributes.value
      }
      const user = await userService.login(loginInfo)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(login(user))
      history.push('/')
    } catch (expection) {
      console.error(expection)
    }

  }
  return (
    <>
      <Typography component='h1'>
        Log In
      </Typography>
      <form className={classes.root} autoComplete='off' onSubmit={handleLogin}>
        <div>
          <TextField {...username.attributes} required margin='normal' />
        </div>
        <div>
          <PasswordField props={password.attributes} />
        </div>
        <Button color='primary' type='submit' variant='contained'>
          Log In
        </Button>
      </form>
    </>
  )
}

export default Login