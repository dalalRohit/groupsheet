import { combineReducers } from '@reduxjs/toolkit'

import usersReducer, {
	userSelector,
	userActions,
	userCreators,
} from './slices/usersRed'
import groupReducer, {
	groupActions,
	groupCreators,
	grpSelector,
} from './slices/groupRed'
import taskReducer, {
	taskSelector,
	taskActions,
	taskCreators,
} from './slices/taskRed'

const rootReducer = combineReducers({
	users: usersReducer,
	tasks: taskReducer,
	groups: groupReducer,
})

//SELECTORS
export const selectors = {
	userSelector,
	grpSelector,
	taskSelector,
}

//CREATORS
export const creators = {
	taskCreators,
	userCreators,
	groupCreators,
}

//ACTIONS
export const actions = {
	groupActions,
	userActions,
	taskActions,
}

export default rootReducer
