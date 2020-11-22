import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
	groups: [],
	fetching_group: false,
	group: null,
	details: false,
	fetching_details: false,
	group_details: null,
}

export const grpSlice = createSlice({
	name: 'groups',
	initialState: initialState,
	reducers: {
		setGroups: (state, payload) => {
			state.fetching_group = false
			state.groups = payload.payload
		},
		fetchingGroup: (state) => {
			state.fetching_group = true
		},
		setGroup: (state, payload) => {
			if (payload.payload.clear && state.details) state.details = false
			state.fetching_group = false
			state.group = payload.payload.group
		},
		clear: (state, { payload }) => {
			state.fetching_group = false
			payload ? (state.groups = null) : (state.group = null)
		},
		fetchingDetails: (state) => {
			state.fetching_details = true
		},
		setDetails: (state, payload) => {
			state.details = payload !== undefined ? payload.payload : true
		},

		setGroupDetails: (state, payload) => {
			state.fetching_details = false
			state.group_details = payload.payload
		},
	},
})

const actions = grpSlice.actions

export const {
	setGroups,
	fetchingGroup,
	setGroup,
	clear,
	setDetails,
	setGroupDetails,
	fetchingDetails,
} = actions
export const grpSelector = (state) => state.groups
export default grpSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/
const getGroupsForUser = () => async (dispatch) => {
	dispatch(fetchingGroup())
	axios
		.get('/groups/all', { withCredentials: true })
		.then((res) => {
			dispatch(setGroups(res.data))
		})
		.catch((err) => {})
}

const getGroup = (id) => async (dispatch, getState) => {
	dispatch(fetchingGroup())
	const { groups } = getState()
	if (groups.groups && groups.groups.length) {
		const allGroups = groups.groups
		allGroups.filter((grp) => {
			if (grp.group_id === id) {
				return dispatch(setGroup({ group: grp }))
			}
		})
	} else {
		axios
			.get(`/groups/${id}`)
			.then((res) => {
				dispatch(setGroup({ group: res.data }))
			})
			.catch((err) => {})
	}
}

const getGroupDetails = (id) => async (dispatch) => {
	dispatch(setDetails(true))
	dispatch(fetchingDetails())
	dispatch(getGroup(id))
	axios.get(`/groups/details/${id}`).then((res) => {
		dispatch(setGroupDetails(res.data))
	})
}

export const groupActions = {
	setGroups: actions.setGroups,
	fetchingGroup: actions.fetchingGroup,
	setGroup: actions.setGroup,
	clear: actions.clear,
	setDetails: actions.setDetails,
}

export const groupCreators = {
	getGroupsForUser,
	getGroup,
	getGroupDetails,
}
