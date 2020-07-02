import React from 'react'
import { useField } from '../hooks'
import userService from '../services/userService'

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

const Register = () => {
    const username = useField('username', 'text')
    const password = useField('password', 'password')
    const passwordConfirm = useField('confirm password', 'password')
    const email = useField('email', 'email')

    const classes = useStyles()

    const handleRegister = async event => {
        event.preventDefault()
        if (password.attributes.value.trim() === passwordConfirm.attributes.value.trim()) {
            try {
                const registerUser = {
                    username: username.attributes.value.trim(),
                    password: password.attributes.value.trim(),
                    email: email.attributes.value.trim()
                }
                const res = await userService.register(registerUser)
                // TODO: handle after registeration
                console.log(res)
            } catch (exception) {
                console.error(exception)
            }
        } else {
            console.log('passut')
        }
    }

    const passwordNotMatch = () => {

    }

    return (
        <>
            <Typography component='h1'>
                Register
            </Typography>
            <form className={classes.root} autoComplete='off' onSubmit={handleRegister}>
                <div>
                    <TextField {...username.attributes} required margin='normal' />
                    <TextField {...email.attributes} autoComplete='email' margin='normal' required />
                </div>
                <div>
                    <PasswordField props={password.attributes} />
                    <PasswordField props={passwordConfirm.attributes} />
                </div>
                <Button color='primary' type='submit' variant='contained'>
                    Register
                </Button>
            </form>
        </>
    )
}

export default Register