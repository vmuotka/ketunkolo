import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import userReducer from './reducers/userReducer'
import themeReducer from './reducers/themeReducer'
import initrackerReducer from './reducers/initrackerReducer'
import initrackerGroupReducer from './reducers/initrackerGroupReducer'
import monsterCreatorReducer from './reducers/monsterCreatorReducer'
import spellCreatorReducer from './reducers/spellCreatorReducer'

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  initracker: initrackerReducer,
  initrackerGroup: initrackerGroupReducer,
  monsterCreator: monsterCreatorReducer,
  spellCreator: spellCreatorReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store