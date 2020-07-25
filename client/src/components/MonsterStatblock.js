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
  return (
    <>
      {monster && Object.getOwnPropertyNames(monster).length >= 1 ?
        (<>
          <Divider className={classes.divider} />
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
            <strong>Speed</strong> {
              Object.keys(monster.speed).map((speedType) => (
                speedType !== 'hover' ?
                  speedType + ' ' + monster.speed[speedType] + ' ft., '
                  : 'fly ' + monster.speed[speedType] + ' ft. (hover),'
              ))
            }
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
          {((monster.saving_throws && Object.getOwnPropertyNames(monster.saving_throws).length >= 1) ||
            (monster.skills && Object.getOwnPropertyNames(monster.skills).length >= 1) ||
            monster.vulnerabilities.length !== 0 ||
            monster.immunities.length !== 0 ||
            monster.resistances.length !== 0 ||
            monster.condition_immunities.length !== 0 ||
            monster.senses.length !== 0 ||
            monster.languages.length !== 0 ||
            monster.challenge_rating)
            ? <Divider className={classes.divider} /> : null}

          {monster.saving_throws && Object.getOwnPropertyNames(monster.saving_throws).length >= 1 ?
            <Typography component='span' className={classes.property}><strong>Saving Throws&nbsp;</strong>
              {Object.keys(monster.saving_throws).map((stat, i) => (
                <span key={i}>
                  {stat} {monster.saving_throws[stat] >= 0 ? `+${monster.saving_throws[stat]}` : monster.saving_throws[stat]},<span>&nbsp;</span>
                </span>
              ))}
            </Typography>
            : null}
          {
            monster.skills && Object.getOwnPropertyNames(monster.skills).length >= 1 ?
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
            monster.vulnerabilities.length > 0 ? <Typography component='span' className={classes.property}>
              <strong>Damage Vulnerabilities&nbsp;</strong> {
                monster.vulnerabilities.map(vulnerability => (
                  vulnerability + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.resistances.length > 0 ? <Typography component='span' className={classes.property}>
              <strong>Damage Resistances&nbsp;</strong> {
                monster.resistances.map(resistance => (
                  resistance + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.immunities.length > 0 ? <Typography component='span' className={classes.property}>
              <strong>Damage Immunities&nbsp;</strong> {
                monster.immunities.map(immunity => (
                  immunity + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.condition_immunities.length > 0 ? <Typography component='span' className={classes.property}>
              <strong>Condition Immunities&nbsp;</strong> {
                monster.condition_immunities.map(immunity => (
                  immunity + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.senses.length > 0 ? <Typography component='span' className={classes.property}>
              <strong>Senses&nbsp;</strong> {
                monster.senses.map(sense => (
                  sense + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.languages.length ? <Typography component='span' className={classes.property}>
              <strong>Languages&nbsp;</strong> {
                monster.languages.map(language => (
                  language + ', '
                ))
              }
            </Typography>
              : null
          }
          {
            monster.challenge_rating ? <Typography component='span' className={classes.property}>
              <strong>Challenge Rating&nbsp;</strong> {monster.challenge_rating}
            </Typography>
              : null
          }
          {
            monster.special_abilities.length !== 0 ?
              <>
                <Divider className={classes.divider} />
                {monster.special_abilities.map((ability, index) => (
                  <Typography component='span' className={classes.property} key={index}>
                    <strong>{ability.name}&nbsp;</strong> {ability.desc}
                  </Typography>
                ))}
              </>
              : null
          }

          {
            monster.actions.length === 0 ? null :
              <>
                <Divider className={classes.divider} />
                <Typography component='h2'><strong>Actions</strong></Typography>
                {monster.actions.map((action, index) => (
                  <Typography component='span' className={classes.property} key={index}>
                    <strong>{action.name}&nbsp;</strong> {action.desc}
                  </Typography>
                ))}
              </>
          }
          {
            monster.legendary_actions.length === 0 ? null :
              <>
                <Divider className={classes.divider} />
                <Typography component='h2'><strong>Legendary Actions</strong></Typography>
                <Typography component='span' className={classes.property}>
                  {monster.legendary_desc}
                </Typography>
                {
                  monster.legendary_actions.map((action, index) => (
                    <Typography component='span' className={classes.property} key={index}>
                      <strong>{action.name}&nbsp;</strong> {action.desc}
                    </Typography>
                  ))
                }
              </>
          }

        </>) : null
      }
      <Divider className={classes.divider} />
    </>
  )
}

export default MonsterStatblock