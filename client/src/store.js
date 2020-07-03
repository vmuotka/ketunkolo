import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import userReducer from './reducers/userReducer'
import themeReducer from './reducers/themeReducer'
import initrackerReducer from './reducers/initrackerReducer'

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  initracker: initrackerReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store