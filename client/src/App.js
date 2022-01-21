import React, { useEffect } from 'react'
import { login } from './reducers/userReducer'
import { connect } from 'react-redux'


// components
import Navigation from './components/Navigation'
import initrackerService from './services/initrackerService'
import Router from './Router'
import { SocketContext, socket } from './hooks/socket'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    relativeContainer: {
        position: 'relative'
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
            <SocketContext.Provider value={socket}>
                <Navigation>
                    <Container maxWidth='lg' style={{ height: '100%' }} className={classes.relativeContainer}>
                        <Router props></Router>
                    </Container>
                </Navigation>
            </SocketContext.Provider>
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
