import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'

import {
  MenuIcon,
  HomeIcon,
  SearchIcon,
  ClipboardList,
  BookIcon,
  UserIcon,
  UserGroupIcon
} from './icons/'

const iconProps = {
  className: 'inline h-6'
}

const mainNavs = [
  {
    name: 'Home',
    route: '/',
    icon: <HomeIcon {...iconProps} />
  },
  {
    name: 'INITracker',
    route: '/initracker',
    icon: <ClipboardList {...iconProps} />
  },
  {
    name: 'Characters',
    route: '/characters',
    icon: <UserGroupIcon {...iconProps} />
  },
  {
    name: 'Spells',
    icon: <BookIcon {...iconProps} />,
    subItems: [
      {
        name: 'Search',
        route: '/spells/search',
        icon: <SearchIcon {...iconProps} />
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
        route: '/monsters/search',
        icon: <SearchIcon {...iconProps} />
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

const NavItem = ({ item, className }) => {
  return (
    <li className={`hover:bg-primary-600 ${className}`}>
      <Link exact activeClassName='bg-primary-600' className='block w-full px-12 py-2' to={item.route}>
        <div className='grid grid-cols-2 gap-2' style={{ gridTemplateColumns: '25% 75%' }}>
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      </Link>
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
        <div className='grid grid-cols-2 gap-2' style={{ gridTemplateColumns: '25% 75%' }}>
          <span>{item.icon}</span>
          {item.name}
        </div>
      </NavButton>
      <ul
        className={`${isOpen ? 'max-h-24' : 'max-h-0'} overflow-hidden transition-all`}
      >
        {item.subItems.map(subItem =>
          <NavItem className='px-8' key={subItem.name} item={subItem} />
        )}
      </ul>
    </li>
  )
}

const Navigation = (props) => {
  const history = useHistory()
  const [showNav, setShowNav] = useState(true)
  const userNavs = [
    {
      name: props.user === null ? null : props.user.username,
      route: '/user_settings',
      icon: <UserIcon {...iconProps} />
    }
  ]

  const handleSignOut = () => {
    window.localStorage.setItem('loggedUser', null)
    props.logout()
    history.push('/')
  }

  return (
    <>
      <div className='w-full relative grid grid-cols-2' style={{ gridTemplateColumns: '1fr 8fr' }}>
        <div className='bg-primary-500 flex justify-center items-center'>
          <button
            onClick={() => setShowNav(!showNav)}
            className={`text-white rounded-full hover:shadow transition-shadow p-1 focus:outline-none`}
          >
            <MenuIcon className='h-8' />
          </button>
        </div>
        <div className='bg-primary-500 text-2xl text-white font-bold px-4 py-4 shadow'>
          Ketunkolo
        </div>
        <nav
          className={`sticky top-0 h-screen bg-primary-500 divide-y shadow transition-transform transition-duration-300 ${showNav ? 'max-w-lg' : 'max-w-0 overflow-hidden'}`}
          style={{ transitionProperty: 'max-width' }}
        >
          <ul className='flex flex-col text-lg text-white border-white'>
            {mainNavs.map(item =>
              item.subItems ?
                <NavFolder key={item.name} item={item} />
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
                <NavItem key={item.name} item={item} />
              )}
          </ul>
        </nav>
        <div className='mt-6'>
          {props.children}
        </div>
      </div>
    </>
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