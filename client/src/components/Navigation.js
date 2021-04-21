import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

const mainNavs = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'INITracker',
    route: '/initracker'
  },
  {
    name: 'Characters',
    route: '/characters'
  },
  {
    name: 'Spells',
    subItems: [
      {
        name: 'Search',
        route: '/spells/search'
      },
      {
        name: 'Workshop',
        route: '/spells/workshop'
      }
    ]
  },
  {
    name: 'Monsters',
    subItems: [
      {
        name: 'Search',
        route: '/monsters/search'
      },
      {
        name: 'Workshop',
        route: '/monsters/workshop'
      }
    ]
  }
]

const loggedOutNavs = [
  {
    name: 'Sign in',
    route: '/signin'
  },
  {
    name: 'Sign up',
    route: '/signup'
  }
]

const NavButton = ({ onClick, children }) => {
  return (
    <button className='hover:bg-primary-600 block w-full px-12 py-2 text-left focus:outline-none' onClick={onClick}>
      {children}
    </button>
  )
}

const NavItem = ({ item }) => {
  return (
    <li className='hover:bg-primary-600'>
      <Link className='block w-full px-12 py-2' to={item.route}>{item.name}</Link>
    </li>
  )
}

const NavFolder = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li>
      <NavButton
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.name}
      </NavButton>
      <ul
        className={`${isOpen ? 'max-h-24' : 'max-h-0'} overflow-hidden transition-all mx-6`}
      >
        {item.subItems.map(subItem =>
          <NavItem key={subItem.name} item={subItem} />
        )}
      </ul>
    </li>
  )
}

const Navigation = (props) => {
  const history = useHistory()
  const userNavs = [
    {
      name: props.user === null ? null : props.user.username,
      route: '/user_settings'
    }
  ]

  const handleSignOut = () => {
    window.localStorage.setItem('loggedUser', null)
    props.logout()
    history.push('/')
  }

  return (
    <div className='w-full relative flex'>
      <nav className='sticky top-0 h-screen bg-primary-500 divide-y'>
        <ul className='flex flex-col text-lg text-white border-white'>
          {mainNavs.map(item =>
            item.subItems ?
              <NavFolder item={item} />
              : <NavItem key={item.name} item={item} />

          )}
        </ul>
        <ul className='flex flex-col text-lg text-white mt-2 pt-2 border-white'>
          {props.user ?
            <>
              {userNavs.map(item =>
                <NavItem key={item.name} item={item} />
              )
              }
              <li className='hover:bg-primary-600'>
                <NavButton onClick={handleSignOut}>Sign Out</NavButton>
              </li>
            </>
            : loggedOutNavs.map(item =>
              <NavItem item={item} />
            )}
        </ul>
      </nav>
      <div className='mt-8'>
        {props.children}
      </div>
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