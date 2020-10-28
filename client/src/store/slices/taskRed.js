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

		setTasks: (state, payload) => {
			state.task_fetching = false
			state.tasks = payload.payload
		},

		newTask: (state, payload) => {
			state.tasks.push(payload.payload)
		},
	},
})
const actions = taskSlice.actions

export const taskActions = {
	loaded: actions.loaded,
	loading: actions.loading,
	setTasks: actions.setTasks,
}
export const { loading, setTasks, newTask } = actions
export const taskSelector = (state) => state.tasks
export default taskSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/

const getTasks = (grpId) => async (dispatch) => {
	dispatch(loading())
	axios
		.get(`/tasks/${grpId}`)
		.then((res) => {
			dispatch(setTasks(res.data.tasks))
		})
		.catch((err) => {})
}

const addTask = (data) => async (dispatch, getState) => {
	const { users } = getState()
	data['username'] = users.user.username
	socket.emit('newTask', data)
}

const addNewTask = (newTaskData) => async (dispatch, getState) => {
	// const { tasks } = getState()

	// let data = [...tasks.tasks]
	// data.push(newTask)

	dispatch(newTask(newTaskData))
}

export const taskCreators = {
	getTasks,
	addTask,
	addNewTask,
}
