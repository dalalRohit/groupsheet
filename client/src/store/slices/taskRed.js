import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
	tasks: [],
	task_fetching: false,
}

export const taskSlice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		loading: (state) => {
			state.task_fetching = true
		},

		loaded: (state) => {
			state.task_fetching = false
		},

		set: (state, payload) => {
			state.task_fetching = false
			state.tasks = payload.payload
		},
	},
})

export const { loaded, loading, set } = taskSlice.actions
export const taskSelector = (state) => state.tasks
export default taskSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/
export const getTasks = (grpId) => async (dispatch) => {
	dispatch(loading())
	axios
		.get(`/tasks/${grpId}`)
		.then((res) => {
			dispatch(set(res.data.tasks))
		})
		.catch((err) => {})
}