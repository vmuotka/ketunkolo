import React from 'react'
import ReactMarkdown from 'react-markdown'

// materialui components
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles, styled } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  property: {
    display: 'block',
    fontSize: '1rem',
    margin: theme.spacing(.3, 1),
  },
  attributes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& .MuiTypography-root': {
      textAlign: 'center',
      margin: theme.spacing(1),
    }
  },
  divider: {
    backgroundColor: '#3f51b5',
    height: '.15rem'
  },
  markdown: {
    display: 'inline',
    '& *': {
      margin: theme.spacing(.15, 1.5)
    }
  }
}))

const Markdown = styled(ReactMarkdown)({
  p: {
    display: 'inline'
  }
})

// only types listed here are rendered
const markdownTypes = ['paragraph', 'text', 'strong', 'emphasis', 'list', 'listItem']


const SpellBlock = (props) => {
  const spell = props.spell
  const classes = useStyles()
  return (
    <>
      <Divider className={classes.divider} />
      {spell && Object.getOwnPropertyNames(spell).length >= 1 ? (
        <>
          <Typography component='h1'>
            {spell.name}
            {spell.ritual ? '\xa0(ritual)' : null}
          </Typography>
          <Typography component='span' className={classes.property}>
            <i>
              {spell.level}&nbsp;
              {spell.school}
            </i>
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Casting Time:</strong>&nbsp;
            {spell.casting_time}
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Range:</strong>&nbsp;
            {spell.range}
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Components:</strong>&nbsp;
            {spell.components.join(', ')}
            {(spell.material && spell.components.includes('M')) ? `\xa0(${spell.material})` : null}
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Duration:</strong>&nbsp;
            {spell.duration}
            {spell.concentration ? '\xa0(c)' : null}
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Classes:</strong>&nbsp;
            {spell.class.join(', ')}
          </Typography>
          <Divider className={classes.divider} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em'
          }}>
            <Markdown
              source={spell.desc}
              className={classes.markdown}
              skipHtml={true}
              allowedTypes={markdownTypes}
            />
            {spell.higher_level ?
              <Markdown
                source={spell.higher_level}
                className={classes.markdown}
                skipHtml={true}
                allowedTypes={markdownTypes}
              />
              : null}
          </div>
          <Divider className={classes.divider} />
        </>
      ) : null}
    </>
  )
}

export default SpellBlock