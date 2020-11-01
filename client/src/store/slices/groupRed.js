import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
	groups: [],
	fetching: false,
	group: null,
	details: false,
}

export const grpSlice = createSlice({
	name: 'groups',
	initialState: initialState,
	reducers: {
		setGroups: (state, payload) => {
			state.fetching = false
			state.groups = payload.payload
		},
		fetching: (state) => {
			state.fetching = true
		},
		single: (state, payload) => {
			if (state.details) {
				state.details = false
			}
			state.fetching = false
			state.group = payload.payload
		},
		clear: (state, { payload }) => {
			state.fetching = false
			payload ? (state.groups = null) : (state.group = null)
		},
		setGroupDetails: (state) => {
			state.details = !state.details
		},
	},
})

const actions = grpSlice.actions

export const { setGroups, fetching, single, clear, setGroupDetails } = actions
export const grpSelector = (state) => state.groups
export default grpSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/
const getGroupsForUser = () => async (dispatch) => {
	dispatch(fetching())
	axios
		.get('/groups/all', { withCredentials: true })
		.then((res) => {
			dispatch(setGroups(res.data))
		})
		.catch((err) => {})
}

const getGroup = (id) => async (dispatch) => {
	dispatch(fetching())

	axios
		.get(`/groups/${id}`)
		.then((res) => {
			dispatch(single(res.data))
		})
		.catch((err) => {})
}

export const groupActions = {
	setGroups: actions.setGroups,
	fetching: actions.fetching,
	single: actions.single,
	clear: actions.clear,
	setGroupDetails: actions.setGroupDetails,
}

export const groupCreators = {
	getGroupsForUser,
	getGroup,
}
