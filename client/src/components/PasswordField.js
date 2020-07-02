import React, { useState } from 'react'

// materialUI
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { FormHelperText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  error: {
    color: 'red'
  },
}))

const PasswordField = props => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  let errorAlert = false
  if (props.error !== undefined)
    errorAlert = props.error

  let errorText = null
  if (props.errorText !== undefined)
    errorText = props.errorText

  let helperText = null
  if (props.helperText !== undefined)
    helperText = props.helperText

  return (
    <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor="standard-adornment-password" className={errorAlert ? classes.error : null}>{props.attributes.label}</InputLabel>
      <Input
        error={errorAlert}
        id={props.attributes.id}
        type={showPassword ? 'text' : 'password'}
        value={props.attributes.value}
        onChange={props.attributes.onChange}
        name={props.attributes.name}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              tabIndex='-1'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errorAlert ? <FormHelperText className={classes.error}>{errorText}</FormHelperText> : helperText !== null ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default PasswordField