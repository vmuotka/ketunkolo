const initialState = {
  name: '',
  desc: '',
  range: '',
  components: [],
  material: '',
  ritual: false,
  duration: 'Instantaneous',
  concentration: false,
  casting_time: '1 action',
  level: '',
  school: '',
  class: [],
  higher_level: ''
}

export const setForm = (obj) => {
  return {
    type: 'SET_STATE',
    data: obj
  }
}

export const copySpell = (obj) => {
  delete obj.user
  return {
    type: 'COPY',
    data: obj
  }
}

export const editSpell = (obj) => {
  return {
    type: 'EDIT',
    data: obj
  }
}

export const resetSpell = () => {
  return {
    type: 'RESET'
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      const name = Object.keys(action.data)[0]
      const form = {
        ...state,
        [name]: action.data[name]
      }
      return form
    case 'EDIT':
      return action.data
    case 'COPY':
      return action.data
    case 'RESET':
      return initialState
    default: return state
  }
}

export default reducer