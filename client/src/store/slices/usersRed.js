import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { groupActions } from './groupRed'
import { flashActions } from './flashRed'
export const initialState = {
	register: false,
	loading: false,
	user: null,
	auth: false,
	user_fetching: false,
	user_loaded: false,
}

export const checkAuth = createAsyncThunk('users/checkAuth', async () => {
	try {
		const res = await axios.get('/users/me', { withCredentials: true })
		return res.data
	} catch (err) {
		throw new Error(err)
	}
})

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		auth_start: (state) => {
			state.loading = true
			state.user = null
			state.auth = false
		},
		login: (state, payload) => {
			state.auth = true
			state.user = payload.payload
			state.loading = false
		},
		register: (state, payload) => {
			state.register = true
			state.loading = false
		},
		user_loaded: (state, payload) => {
			state.auth = true
			state.user = payload.payload
			state.loading = false
		},
		user_loading: (state) => {
			state.loading = true
			state.auth = false
			state.user = null
		},
		auth_fail: (state) => {
			state.auth = false
			state.user = null
			state.loading = false
		},
		logout: (state) => {
			state.auth = false
			state.user = null
			state.loading = false
		},
	},
	extraReducers: {
		[checkAuth.pending]: (state, action) => {
			state.user_fetching = true
		},
		[checkAuth.fulfilled]: (state, action) => {
			state.user_fetching = false
			state.user_loaded = true
			state.auth = true
			state.user = action.payload.user
		},
		[checkAuth.rejected]: (state, action) => {
			state.user_loaded = false
			state.user_fetching = false
			state.auth = false
			state.user = action.error
			window.location.href = '/login'
		},
	},
})

const actions = userSlice.actions
export const userActions = {
	login: actions.login,
	auth_fail: actions.auth_fail,
	auth_start: actions.auth_start,
	user_loaded: actions.user_loaded,
	user_loading: actions.user_loading,
	logout: actions.logout,
	register: actions.register,
}

export const {
	login,
	auth_fail,
	auth_start,
	user_loaded,
	user_loading,
	logout,
	register,
} = userSlice.actions

export const userSelector = (state) => state.users
export default userSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/

const registerUser = (data) => async (dispatch) => {
	const x = {
		username: data.username,
		email: data.email,
		password: data.password,
	}
	axios
		.post('/users/signup', x)
		.then((res) => {
			dispatch(register())
		})
		.catch((err) => {
			console.log(err)
			dispatch(auth_fail())
			dispatch(
				flashActions.set({
					type: 'warning',
					msg: (err.response && err.response.data.msg) || err.message,
					page: 'register',
				})
			)
		})
}

//https://medium.com/dev-genius/async-api-fetching-with-redux-toolkit-2020-8623ff9da267
const loginUser = (data) => async (dispatch) => {
	dispatch(auth_start())
	axios
		.post('/users/login', { username: data.username, password: data.password })
		.then((res) => {
			dispatch(login(res.data.user))
		})
		.catch((err) => {
			dispatch(auth_fail())
			dispatch(
				flashActions.set({
					type: 'warning',
					msg: err.response.data.msg,
					page: 'login',
				})
			)
		})
}
const logoutUser = () => async (dispatch) => {
	dispatch(auth_start())

	axios
		.get('/users/logout', { withCredentials: true })
		.then((res) => {
			dispatch(logout())
			dispatch(groupActions.clear(false))
			dispatch(
				flashActions.set({
					type: 'success',
					msg: 'You are logged out!',
					page: 'login',
				})
			)
		})
		.catch((err) => {
			dispatch(auth_fail())
		})
}

export const userCreators = {
	registerUser,
	loginUser,
	logoutUser,
}
