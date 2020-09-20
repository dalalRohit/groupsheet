import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
	process: false,
	groups: [],
}

export const grpSlice = createSlice({
	name: 'groups',
	initialState: initialState,
	reducers: {
		set: (state, payload) => {
			state.groups = payload.payload
		},
		adding: (state) => {
			state.process = true
		},
		added: (state) => {
			state.process = false
		},
		fail: (state) => {
			state.process = false
		},
	},
})

export const { added, adding, fail, set } = grpSlice.actions
export const grpSelector = (state) => state.groups
export default grpSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/
export const getGroupsForUser = () => async (dispatch) => {
	axios
		.get('/groups', { withCredentials: true })
		.then((res) => {
			dispatch(set(res.data))
		})
		.catch((err) => {})
}

export const addGroup = () => (dispatch) => {
	const data = {
		name: 'Chelsea Group',
		onBudget: false,
	}
	dispatch(adding())
	axios
		.post('/groups/add', { data }, { withCredentials: true })
		.then((res) => {
			dispatch(added())
		})
		.catch((err) => {
			dispatch(fail())
		})
}
