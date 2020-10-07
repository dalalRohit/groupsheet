import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	flash: true,
}

const flashSlice = createSlice({
	name: 'flash',
	initialState,
	reducers: {
		clear: (state) => {
			state.flash = false
		},
	},
})

export const { clear } = flashSlice.actions
export const flashSelector = (state) => state.flash
export default flashSlice.reducer
