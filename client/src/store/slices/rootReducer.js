import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from './usersRed'
import taskReducer from './taskRed'
import groupReducer from './groupRed'
import flashReducer from './flashRed'

import { userSelector, loginUser, logoutUser, checkAuth } from './usersRed'
import { grpSelector, getGroupsForUser, getGroup } from './groupRed'
import { taskSelector, getTasks } from './taskRed'

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
}

//CREATORS
export const creators = {
	//user
	loginUser,
	logoutUser,
	checkAuth,

	//groups
	getGroupsForUser,
	getGroup,

	//task
	getTasks,
}

export default rootReducer
