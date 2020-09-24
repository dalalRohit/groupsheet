import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const initialState = {
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

export const {
	login,
	auth_fail,
	auth_start,
	user_loaded,
	user_loading,
	logout,
} = userSlice.actions
export const userSelector = (state) => state.users
export default userSlice.reducer

/*==================================
ALL ASYNC ACTION CREATORS 
===================================*/

//https://medium.com/dev-genius/async-api-fetching-with-redux-toolkit-2020-8623ff9da267

export const loginUser = (data) => async (dispatch) => {
	console.log(data)
	dispatch(auth_start())
	axios
		.post('/users/flogin', { username: data.username, password: data.password })
		.then((res) => {
			dispatch(login(res.data.user))
		})
		.catch((err) => {
			dispatch(auth_fail())
		})
}
export const logoutUser = () => async (dispatch) => {
	dispatch(auth_start())

	axios
		.get('/users/logout', { withCredentials: true })
		.then((res) => {
			dispatch(logout())
		})
		.catch((err) => {
			dispatch(auth_fail())
		})
}
