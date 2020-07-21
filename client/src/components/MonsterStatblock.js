import React from 'react'

// materialui components
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  property: {
    display: 'block',
    fontSize: '.9rem',
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
  }
}))



const MonsterStatblock = (props) => {
  const monster = props.monster
  const classes = useStyles()
  console.log(monster)

  return (
    <>
      {monster.name ?
        (<>
          <Typography component='h1'>
            <strong>{monster.name}</strong>
          </Typography>
          <Typography component='span' className={classes.property}>
            {monster.size}&nbsp;{monster.type}&nbsp;{monster.subtype ? `(${monster.subtype})` : null}&nbsp;{monster.alignment}
          </Typography>
          <Divider className={classes.divider} />
          <Typography component='span' className={classes.property}>
            <strong>Armor Class&nbsp;</strong> {monster.armor_class}&nbsp;{monster.armor_desc ? `(${monster.armor_desc})` : null}
          </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Hit Points</strong> {monster.hit_points} ({monster.hit_dice})
      </Typography>
          <Typography component='span' className={classes.property}>
            <strong>Speed</strong> {monster.speed}
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.attributes}>
            {
              Object.keys(monster.attributes).map((stat) => (
                <Typography component='span' key={stat} className={classes.property}>
                  <strong>{stat.toUpperCase()}</strong><br />
                  {monster.attributes[stat]} ({
                    Math.floor((monster.attributes[stat] - 10) / 2) >= 0 ? `+${Math.floor((monster.attributes[stat] - 10) / 2)}` : Math.floor((monster.attributes[stat] - 10) / 2)
                  })
                </Typography>
              ))
            }
          </div>
          <Divider className={classes.divider} />
          {monster.saving_throws ?
            <Typography component='span' className={classes.property}><strong>Saving Throws&nbsp;</strong>
              {Object.keys(monster.saving_throws).map((stat, i) => (
                <span key={i}>
                  {stat} {monster.saving_throws[stat] >= 0 ? `+${monster.saving_throws[stat]}` : monster.saving_throws[stat]},<span>&nbsp;</span>
                </span>
              ))}
            </Typography>
            : null}
          {
            monster.skills ?
              <Typography component='span' className={classes.property}><strong>Skills&nbsp;</strong>
                {
                  Object.keys(monster.skills).map((skill, i) => (
                    <span key={i}>
                      {skill} {monster.skills[skill] >= 0 ? `+${monster.skills[skill]}` : monster.skills[skill]}, &nbsp;
                    </span>
                  ))
                }
              </Typography>
              : null
          }
          {
            monster.vulnerabilities ? <Typography component='span' className={classes.property}>
              <strong>Damage Vulnerabilities&nbsp;</strong> {monster.vulnerabilities}
            </Typography>
              : null
          }
          {
            monster.resistances ? <Typography component='span' className={classes.property}>
              <strong>Damage Resistances&nbsp;</strong> {monster.resistances}
            </Typography>
              : null
          }
          {
            monster.immunities ? <Typography component='span' className={classes.property}>
              <strong>Damage Immunities&nbsp;</strong> {monster.immunities}
            </Typography>
              : null
          }
          {
            monster.condition_immunities ? <Typography component='span' className={classes.property}>
              <strong>Condition Immunities&nbsp;</strong> {monster.condition_immunities}
            </Typography>
              : null
          }
          {
            monster.senses ? <Typography component='span' className={classes.property}>
              <strong>Senses&nbsp;</strong> {monster.senses}
            </Typography>
              : null
          }
          {
            monster.languages ? <Typography component='span' className={classes.property}>
              <strong>Languages&nbsp;</strong> {monster.languages}
            </Typography>
              : null
          }
          {
            monster.challenge_rating ? <Typography component='span' className={classes.property}>
              <strong>Challenge Rating&nbsp;</strong> {monster.challenge_rating}
            </Typography>
              : null
          }
          <Divider className={classes.divider} />
          {
            monster.special_abilities ?
              <>
                {monster.special_abilities.map(ability => (
                  <Typography component='span' className={classes.property} key={ability.name}>
                    <strong>{ability.name}&nbsp;</strong> {ability.desc}
                  </Typography>
                ))}
                <Divider className={classes.divider} />
              </>
              : null
          }
          <Typography component='h2'><strong>Actions</strong></Typography>
          {
            monster.actions.map(action => (
              <Typography component='span' className={classes.property} key={action.name}>
                <strong>{action.name}&nbsp;</strong> {action.desc}
              </Typography>
            ))
          }
          {
            monster.legendary_actions.length === 0 ? null :
              <>
                <Divider className={classes.divider} />
                <Typography component='h2'><strong>Legendary Actions</strong></Typography>
                {
                  monster.legendary_actions.map(action => (
                    <Typography component='span' className={classes.property} key={action.name}>
                      <strong>{action.name}&nbsp;</strong> {action.desc}
                    </Typography>
                  ))
                }
              </>
          }

        </>) : null
      }
    </>
  )
}

export default MonsterStatblock