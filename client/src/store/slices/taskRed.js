import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSocket } from './../../hooks/hooks'
//Global Socket for this reducer
const socket = useSocket()

const initialState = {
	tasks: [],
	task_fetching: false,
}

const taskSlice = createSlice({
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

export const addTask = (data) => async (dispatch, getState) => {
	// socket.emit('addTask', data)
	axios
		.post('/tasks/add', data)
		.then((res) => {
			const { tasks } = getState()
			const allTasks = [...tasks.tasks, res.data.task]
			dispatch(set(allTasks))
		})
		.catch((err) => {
			console.log(err)
		})
}
