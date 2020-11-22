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
			let tasks = state.tasks
			tasks.push(payload.payload)
			state.tasks = tasks
		},
		clearTasks: (state) => {
			state.tasks = []
		},
	},
})
const actions = taskSlice.actions

export const taskActions = {
	loaded: actions.loaded,
	loading: actions.loading,
	setTasks: actions.setTasks,
	clearTasks: actions.clearTasks,
	newTask: actions.newTask,
}
export const { loading, setTasks, newTask, clearTasks } = actions
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
	const { users, groups } = getState()
	data['username'] = users.user.username
	socket.emit('newTask', { task: data, room: groups.group.grp_name })
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
