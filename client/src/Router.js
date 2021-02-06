import React from 'react'
import {
  Switch, Route, Redirect
} from 'react-router-dom'

// pages
import Register from './pages/Signup'
import SignIn from './pages/Signin'
import IniTracker from './pages/IniTracker/'
import UserSettings from './pages/UserSettings'
import MonsterSearch from './pages/MonsterSearch'
import Monster from './pages/Monster'
import MonsterWorkshop from './pages/MonsterWorkshop'
import MonsterCreator from './pages/MonsterCreator'
import SpellSearch from './pages/SpellSearch'
import Spell from './pages/Spell'
import SpellWorkshop from './pages/SpellWorkshop'
import SpellCreator from './pages/SpellCreator'

const routes = [
  {
    path: '/initracker',
    component: <IniTracker />,
    login: undefined
  },
  {
    path: '/user_settings',
    component: <UserSettings />,
    login: true
  },
  {
    path: '/signup',
    component: <Register />,
    login: false
  },
  {
    path: '/signin',
    component: <SignIn />,
    login: false
  },
  {
    path: '/spells/search',
    component: <SpellSearch />,
    login: undefined
  },
  {
    path: '/spell/:id',
    component: <Spell />,
    login: undefined
  },
  {
    path: '/spells/workshop',
    component: <SpellWorkshop />,
    login: true
  },
  {
    path: '/spells/create',
    component: <SpellCreator />,
    login: true
  },
  {
    path: '/monsters/search',
    component: <MonsterSearch />,
    login: undefined
  },
  {
    path: '/monsters/workshop',
    component: <MonsterWorkshop />,
    login: true
  },
  {
    path: '/monsters/create',
    component: <MonsterCreator />,
    login: true
  },
  {
    path: '/monster/:id',
    component: <Monster />,
    login: undefined
  },
  {
    path: '/',
    component: <h1>Home</h1>,
    login: undefined
  }
]

const Router = (props) => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  let userObject = null
  if (loggedUserJSON) {
    userObject = JSON.parse(loggedUserJSON)
  }
  return (
    <Switch>
      {
        routes.map((route, index) =>
          <Route key={index} path={route.path} render={() =>
            route.login === true ?
              userObject === null ? <Redirect to='/signin' /> : route.component
              : route.login === false ?
                userObject !== null ? <Redirect to='/' /> : route.component
                : route.login === undefined ?
                  route.component : <Redirect to='/' />
          } />
        )
      }
    </Switch>
  )
}

export default Router