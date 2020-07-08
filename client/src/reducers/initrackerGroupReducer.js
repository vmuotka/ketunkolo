export const setup = (obj) => {
  return {
    type: 'SETUP',
    data: obj
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SETUP':
      return {
        parties: action.data.filter(group => group.type === 'party'),
        monsters: action.data.filter(group => group.type === 'monsters')
      }
    default: return state
  }
}

export default reducer