const initialState = {
  name: 'Arms of Hadar',
  desc: 'You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy erupt from you and batter all creatures within 10 feet of you. Each creature in that area must make a strength saving throw. On a failed save, a target takes 2d6 necrotic damage and can’t take reactions until its next turn. On a successful save, the creature takes half damage, but suffers no other effect.',
  range: 'Self',
  components: ['V', 'S', 'M'],
  material: 'A sliver of glass',
  ritual: false,
  duration: 'up to 1 hour',
  concentration: true,
  casting_time: '1 action',
  level: '1st-level',
  school: 'Conjuration',
  class: ['warlock'],
  higher_level: 'When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.'
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