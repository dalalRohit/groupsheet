import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
	groups: [],
	fetching: false,
	group: null,
}

export const grpSlice = createSlice({
	name: 'groups',
	initialState: initialState,
	reducers: {
		set: (state, payload) => {
			console.log('set', payload)
			state.fetching = false
			state.groups = payload.payload
		},
		fetching: (state) => {
			state.fetching = true
		},
		single: (state, payload) => {
			console.log('single', payload)
			state.fetching = false
			state.group = payload.payload
		},
	},
})

export const { set, fetching, single } = grpSlice.actions
export const grpSelector = (state) => state.groups
export default grpSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/
export const getGroupsForUser = () => async (dispatch) => {
	dispatch(fetching())
	axios
		.get('/groups/all', { withCredentials: true })
		.then((res) => {
			dispatch(set(res.data))
		})
		.catch((err) => {})
}

export const getGroup = (id) => async (dispatch) => {
	dispatch(fetching())

	axios
		.get(`/groups/${id}`)
		.then((res) => {
			dispatch(single(res.data))
		})
		.catch((err) => {})
}
