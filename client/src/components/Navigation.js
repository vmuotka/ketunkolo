import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme, styled } from '@material-ui/core/styles'

// icons
import HomeIcon from '@material-ui/icons/Home'
import LoginIcon from '@material-ui/icons/LockOpen'
import LogoutIcon from '@material-ui/icons/Lock'
import SettingsIcon from '@material-ui/icons/Settings'
import BallotIcon from '@material-ui/icons/Ballot'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import PetsIcon from '@material-ui/icons/Pets'

import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit'
})

const navTitle = 'Ketunkolo'
const mainNavs = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    route: '/'
  },
  {
    name: 'INITracker',
    icon: <BallotIcon />,
    route: '/initracker'
  },
  {
    name: 'Characters',
    icon: <RecentActorsIcon />,
    route: '/characters'
  },
  {
    name: 'Monsters',
    icon: <PetsIcon />,
    route: '/search-monsters'
  }
]

const loggedOutNavs = [
  {
    name: 'Sign in',
    icon: <LoginIcon />,
    route: '/signin'
  },
  {
    name: 'Sign up',
    icon: null,
    route: '/signup'
  }
]

const Navigation = (props) => {
  const { windowVar } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()

  const handleLogout = (event) => {
    window.localStorage.setItem('loggedUser', null)
    props.logout()
    history.push('/')
  }

  const userNavs = [
    {
      name: props.user === null ? null : props.user.username,
      icon: <SettingsIcon />,
      route: '/user_settings'
    }
  ]

  const loggedInDrawer = (
    <>
      {userNavs.map((nav, index) => (
        <Link to={nav.route} key={nav.name}>
          <ListItem button key={nav.name}>
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.name} />
          </ListItem>
        </Link>
      ))}
      < ListItem button key='logout' onClick={handleLogout} >
        <ListItemIcon><LogoutIcon /></ListItemIcon>
        <ListItemText primary='Log out' />
      </ListItem >
    </>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {mainNavs.map((nav, index) => (
          <Link to={nav.route} key={nav.name}>
            <ListItem button key={nav.name}>
              <ListItemIcon>{nav.icon}</ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {props.user === null ?
          loggedOutNavs.map((nav, index) => (
            <Link to={nav.route} key={nav.name}>
              <ListItem button key={nav.name}>
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText primary={nav.name} />
              </ListItem>
            </Link>
          ))
          : loggedInDrawer
        }

      </List>
    </div>
  )



  const container = windowVar !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {navTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

const mapDispatchToProps = {
  logout
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const connectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation)

export default connectedNavigation