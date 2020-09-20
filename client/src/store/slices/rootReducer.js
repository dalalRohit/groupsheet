import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from './usersRed'
import taskReducer from './taskRed'
import groupReducer from './groupRed'
import flashReducer from './flashRed'

import { userSelector, loginUser, logoutUser } from './usersRed'
import { grpSelector, getGroupsForUser } from './groupRed'
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
}

//CREATORS
export const creators = {
	loginUser,
	logoutUser,
	getGroupsForUser,
}

export default rootReducer
