import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// project components
import MonsterStatblock from './MonsterStatblock'

// materialui components
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SecurityIcon from '@material-ui/icons/Security'
import FastForwardIcon from '@material-ui/icons/FastForward';
import WarningIcon from '@material-ui/icons/Warning';

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
  divider: {
    margin: theme.spacing(1),
  }
}))

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
          <Typography className={classes.properties} component='p'>
            <FavoriteIcon fontSize='inherit' /> {result.hit_points} ({result.hit_dice})&nbsp;<strong>|</strong>&nbsp;
            <SecurityIcon fontSize='inherit' /> {result.armor_class}&nbsp;
          </Typography>
          <Typography className={classes.properties} component='p'>
            <FastForwardIcon fontSize='inherit' /> {result.speed}&nbsp;<strong>|</strong>&nbsp;
            <WarningIcon fontSize='inherit' /> {result.challenge_rating}
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