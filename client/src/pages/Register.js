import React from 'react'
import { useField } from '../hooks'

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

const Login = () => {
    const username = useField('username', 'text')
    const password = useField('password', 'password')
    const passwordConfirm = useField('confirm password', 'password')
    const email = useField('email', 'email')


    console.log(password.attributes)
    const classes = useStyles()
    return (
        <>
            <Typography component='h1'>
                Register
            </Typography>
            <form className={classes.root} autoComplete='off'>
                <div>
                    <TextField {...username.attributes} required margin='normal' />
                    <TextField {...email.attributes} autoComplete='email' margin='normal' required />
                </div>
                <div>
                    <PasswordField props={password.attributes} />
                    <PasswordField props={passwordConfirm.attributes} />
                </div>
                <Button color='primary' variant='contained'>
                    Register
                </Button>
            </form>
        </>
    )
}

export default Login