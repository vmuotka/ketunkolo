import React, { useState } from 'react'
import { useField } from '../hooks'
import userService from '../services/userService'
import { useHistory } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Project components
import PasswordField from '../components/PasswordField'


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

const Signup = () => {
    const username = useField('username', 'text')
    const password = useField('password', 'password')
    const passwordConfirm = useField('confirm password', 'password')
    const email = useField('email', 'email')

    const classes = useStyles()
    const history = useHistory()

    const [usernameTooShort, setUsernameTooShort] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [invalidEmail, setInvalidEmail] = useState(false)

    const validateEmail = (email) => {
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return expression.test(String(email).toLowerCase())
    }

    const handleRegister = async event => {
        event.preventDefault()
        let validated = true
        setUsernameTooShort(false)
        setPasswordError(false)
        setInvalidEmail(false)
        if (username.attributes.value.length < 3) {
            validated = false
            setUsernameTooShort(true)
        }
        if (password.attributes.value.trim !== passwordConfirm.attributes.value.trim) {
            validated = false
            setPasswordError(true)
            setPasswordErrorMessage("Passwords don't match")

        }
        if (password.attributes.value.length < 5) {
            validated = false
            setPasswordError(true)
            setPasswordErrorMessage('Password too short (min 5)')
        }
        if (!validateEmail(email.attributes.value)) {
            validated = false
            setInvalidEmail(true)
        }

        if (validated) {
            try {
                const registerUser = {
                    username: username.attributes.value.trim(),
                    password: password.attributes.value.trim(),
                    email: email.attributes.value.trim()
                }
                const res = await userService.register(registerUser)
                history.push('/login')

            } catch (exception) {
                console.error(exception)
            }
        }
    }

    return (
        <>
            <Typography component='h1'>
                Sign Up
            </Typography>
            <form className={classes.root} autoComplete='off' noValidate onSubmit={handleRegister}>
                <div>
                    <TextField {...username.attributes} error={usernameTooShort} margin='normal' helperText='Min: 3 characters' />
                    <TextField {...email.attributes} autoComplete='email' margin='normal' error={invalidEmail} />
                </div>
                <div>
                    <PasswordField attributes={password.attributes} error={passwordError} errorText={passwordErrorMessage} helperText='Min: 5 characters' />
                    <PasswordField attributes={passwordConfirm.attributes} error={passwordError} errorText={passwordErrorMessage} />
                </div>
                <Button color='primary' type='submit' variant='contained'>
                    Register
                </Button>
            </form>
        </>
    )
}

export default Signup