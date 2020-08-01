import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// project components
import SpellBlock from './SpellBlock'

// materialui components
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SchoolIcon from '@material-ui/icons/School'
import TimerIcon from '@material-ui/icons/Timer'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import AvTimerIcon from '@material-ui/icons/AvTimer';
import Title from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: '1rem',
    display: 'block',
    cursor: 'pointer',
    width: 'max-content',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  details: {
    display: 'block'
  },
  properties: {
    fontSize: '.9rem',
    '& strong': {
      fontSize: '.95rem'
    }
  },
  attributes: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      margin: theme.spacing(.3, 1),
    }
  },
  divider: {
    margin: theme.spacing(1),
  }
}))

const Tooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#44bcd8',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
  },
}))(Title);

const SearchSpellCard = ({ result }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(false)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='spell-content'
      >
        <div>
          <Link className={classes.link} to={`/spell/${result.id}`} color='inherit'>
            {result.name}
            {result.ritual ? '\xa0(ritual)' : null}
          </Link >
          <Typography className={`${classes.properties}, ${classes.attributes}`} component='p'>
            <Tooltip title='School' placement='top' arrow>
              <span>
                <SchoolIcon fontSize='inherit' />
                <span>
                  {result.level}&nbsp;
            {result.school}
                </span>
              </span>
            </Tooltip>
            <Tooltip title='Casting Time' placement='top' arrow>
              <span>
                <TimerIcon fontSize='inherit' />
                <span>
                  {result.casting_time}
                </span>
              </span>
            </Tooltip>
            <Tooltip title='Range' placement='top' arrow>
              <span>
                <SettingsEthernetIcon fontSize='inherit' />
                <span>
                  {result.range}
                </span>
              </span>
            </Tooltip>
            <Tooltip title='Duration' placement='top' arrow>
              <span>
                <AvTimerIcon fontSize='inherit' />
                <span>
                  {result.duration}
                  {result.concentration ? '\xa0(c)' : null}
                </span>
              </span>
            </Tooltip>
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {expanded ? <SpellBlock spell={result} /> : null}
      </AccordionDetails>
    </Accordion>
  )
}

export default SearchSpellCard