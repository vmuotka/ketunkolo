import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import userReducer from './reducers/userReducer'
import themeReducer from './reducers/themeReducer'

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store