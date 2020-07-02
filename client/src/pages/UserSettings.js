import React from 'react'
import { useDispatch, connect } from 'react-redux'

// reducers
import { setTheme } from '../reducers/themeReducer'

// materialui components
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Container from '@material-ui/core/Container'

const UserSettings = (props) => {
  const dispatch = useDispatch()
  const handleThemeChange = event => {
    let theme = { dark: event.target.checked }
    dispatch(setTheme(theme))
    window.localStorage.setItem(
      'theme', JSON.stringify(theme))
  }

  return (
    <>
      <Typography component='h1'>
        Settings
      </Typography>
      <Divider />
      <Container>
        <FormControlLabel
          checked={props.theme.dark !== undefined ? props.theme.dark : true}
          labelPlacement='start'
          label='Dark Theme'
          control={<Switch onChange={handleThemeChange} name='theme' />}
        />
      </Container>



    </>
  )
}

const mapDispatchToProps = {
  setTheme
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    user: state.user
  }
}

const connectedUserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettings)

export default connectedUserSettings