import rootReducer from './slices/rootReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: rootReducer,
})

export default store
