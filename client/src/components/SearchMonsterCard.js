import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// project components
import MonsterStatblock from './MonsterStatblock'

// materialui components
import Link from '@material-ui/core/Link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SecurityIcon from '@material-ui/icons/Security'
import FastForwardIcon from '@material-ui/icons/FastForward'
import WarningIcon from '@material-ui/icons/Warning'
import Title from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  link: {
    fontSize: '1rem',
    display: 'block',
    cursor: 'pointer',
    width: 'max-content'
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

const SearchMonsterCard = ({ result }) => {
  const classes = useStyles()
  const history = useHistory()

  const [expanded, setExpanded] = useState(false)

  const onLinkClick = () => {
    history.push(`/monster/${result.id}`)
  }

  const handleChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='monster-content'
      >
        <div>
          <Link className={classes.link} href={'/monster/' + result.id} onClick={onLinkClick} color='inherit'>
            {result.name}
          </Link >
          <Typography className={classes.properties} component='p'>
            {result.size}&nbsp;
            {result.type}
            {result.subtype ? ' (' + result.subtype + ')' : null}
            ,&nbsp;{result.alignment}
          </Typography>
          <Typography className={`${classes.properties}, ${classes.attributes}`} component='p'>
            <Tooltip title='Hit Points' placement='top' arrow>
              <span><FavoriteIcon fontSize='inherit' /> <span>{result.hit_points} ({result.hit_dice})&nbsp;</span></span>
            </Tooltip>
            <Tooltip title='Armor Class' placement='top' arrow>
              <span><SecurityIcon fontSize='inherit' /> <span>{result.armor_class}&nbsp;</span></span>
            </Tooltip>
            <Tooltip title='Speed' placement='top' arrow>
              <span><FastForwardIcon fontSize='inherit' /> <span>{result.speed}&nbsp;</span></span>
            </Tooltip>
            <Tooltip title='Challenge Rating' placement='top' arrow>
              <span><WarningIcon fontSize='inherit' /> <span>{result.challenge_rating}</span></span>
            </Tooltip>
          </Typography>
          <Typography className={classes.properties} component='p'>

          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Divider className={classes.divider} />
        {expanded ? <MonsterStatblock monster={result} /> : null}
      </AccordionDetails>
    </Accordion>
  )
}

export default SearchMonsterCard