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

import flashReducer, { flashActions, flashCreators } from './slices/flashRed'

const rootReducer = combineReducers({
	users: usersReducer,
	tasks: taskReducer,
	groups: groupReducer,
	flash: flashReducer,
})

//SELECTORS
export const selectors = {
	userSelector,
	grpSelector,
	taskSelector,
	flashReducer,
}

//CREATORS
export const creators = {
	taskCreators,
	userCreators,
	groupCreators,
	flashCreators,
}

//ACTIONS
export const actions = {
	groupActions,
	userActions,
	taskActions,
	flashActions,
}

export default rootReducer
