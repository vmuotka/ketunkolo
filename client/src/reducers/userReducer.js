const initialState = null

export const login = (loginInfo) => {
  return {
    type: 'LOGIN',
    data: {
      loginInfo
    }
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('logging in')
      return action.data.loginInfo
    case 'LOGOUT':
      return initialState
    default: return state
  }
}

export default reducer