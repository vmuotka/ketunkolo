const initialState = {
  name: '',
  size: '',
  type: '',
  subtype: '',
  alignment: '',
  armor_class: '',
  hit_points: '6',
  hit_dice: '1d8',
  speed: {
    'walk': 30
  },
  attributes: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  },
  saving_throws: {},
  skills: {},
  vulnerabilities: [],
  resistances: [],
  immunities: [],
  condition_immunities: [],
  senses: [],
  languages: [],
  challenge_rating: '',
  special_abilities: [],
  actions: [],
  legendary_desc: '',
  legendary_actions: [],
  armor_desc: '',
  proficiency: 2
}


export const setForm = (obj) => {
  return {
    type: 'SET_STATE',
    data: obj
  }
}

export const copyMonster = (obj) => {
  delete obj.user
  return {
    type: 'COPY',
    data: obj
  }
}

export const editMonster = (obj) => {
  return {
    type: 'EDIT',
    data: obj
  }
}

export const resetMonster = () => {
  return {
    type: 'RESET'
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      const name = Object.keys(action.data)[0]
      let form = {}
      if (Object.keys(action.data).length > 1) {
        const name2 = Object.keys(action.data)[1]
        form = {
          ...state,
          [name]: action.data[name],
          [name2]: action.data[name2]
        }
      } else {
        form = {
          ...state,
          [name]: action.data[name]
        }
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