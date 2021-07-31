import React from 'react'

// materialui components
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 240
  },
}))

const SelectField = (props) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel error={props.error} htmlFor={props.inputProps.id}>{props.label}</InputLabel>
      <Select
        error={props.error}
        autoWidth
        value={props.value}
        inputProps={props.inputProps}
        onChange={props.onChange}
        multiple={props.multiple}
      >
        {/* <MenuItem value=''>{props.emptyValue}</MenuItem> */}
        {
          props.options.map(option =>
            <MenuItem key={option} value={option}>{option}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}

export default SelectField