import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	flash: false,
	msg: null,
	type: null,
	page: null,
}

const flashSlice = createSlice({
	name: 'flash',
	initialState,
	reducers: {
		clear: (state) => {
			state.flash = false
			state.msg = null
			state.type = null
			state.page = null
		},

		set: (state, payload) => {
			state.flash = true
			state.msg = payload.payload.msg
			state.type = payload.payload.type
			state.page = payload.payload.page
		},
	},
})

export const { clear, set } = flashSlice.actions
export const flashSelector = (state) => state.flash
export default flashSlice.reducer

const actions = flashSlice.actions
export const flashActions = {
	set: actions.set,
	clear: actions.clear,
}
export const flashCreators = {}
