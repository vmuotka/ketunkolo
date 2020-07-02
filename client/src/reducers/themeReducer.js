const initialState = JSON.parse(window.localStorage.getItem('theme')) !== null ? JSON.parse(window.localStorage.getItem('theme')) : 'dark'

export const setTheme = (theme) => {
  return {
    type: 'SET_THEME',
    data: {
      theme
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return action.data.theme
    default: return state
  }
}

export default reducer