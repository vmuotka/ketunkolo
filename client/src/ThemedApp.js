import React from 'react'
import { connect } from 'react-redux'
import App from './App'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const ThemedApp = (props) => {
  let colorTheme = 'dark'
  if (!props.theme.dark && props.theme.dark !== undefined) {
    colorTheme = 'light'
  } else {
    colorTheme = 'dark'
  }
  const theme = createMuiTheme({
    palette: {
      type: colorTheme,
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  }
}

const connectedThemedApp = connect(mapStateToProps, {})(ThemedApp)

export default connectedThemedApp