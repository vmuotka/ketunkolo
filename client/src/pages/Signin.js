import React, { useState } from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'

// Project components
import PasswordField from '../components/PasswordField'
import userService from '../services/userService'
import initrackerService from '../services/initrackerService'

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

const Signin = () => {
  const username = useField('username', 'text')
  const password = useField('password', 'password')

  const [alert, setAlert] = useState(false)

  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = async event => {
    event.preventDefault()
    let validated = true
    setUsernameError(false)
    setPasswordError(false)
    if (username.attributes.value.length < 3) {
      validated = false
      setUsernameError(true)
    }
    if (password.attributes.value.length < 5) {
      validated = false
      setPasswordError(true)
    }


    if (validated) {
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
        initrackerService.setToken(user.token)
        history.push('/')
      } catch (expection) {
        setAlert(true)
      }
    }

  }
  return (
    <>
      <Typography component='h1'>
        Sign In
      </Typography>
      {alert ? <Alert severity="error">Wrong credentials!</Alert> : null}
      <form className={classes.root} noValidate onSubmit={handleLogin}>
        <div>
          <TextField {...username.attributes} required margin='normal' error={usernameError} />
        </div>
        <div>
          <PasswordField attributes={password.attributes} error={passwordError} />
        </div>
        <Button color='primary' type='submit' variant='contained'>
          Log In
        </Button>
      </form>
    </>
  )
}

export default Signin