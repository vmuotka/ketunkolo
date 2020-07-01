import React from 'react'
import { useField } from '../hooks'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
    const passwordConfirm = useField('confirm password', 'password')
    const email = useField('email', 'email')

    const classes = useStyles()
    return (
        <>
            <form className={classes.root} autoComplete='off'>
                <div>
                    <TextField {...username.attributes} variant='outlined' required />
                    <TextField {...email.attributes} variant='outlined' autoComplete='email' required />
                </div>
                <div>
                    <TextField {...password.attributes} variant='outlined' required />
                    <TextField {...passwordConfirm.attributes} variant='outlined' required />
                </div>
                <Button color='primary' variant='contained'>
                    Register
                </Button>
            </form>
        </>
    )
}

export default Login