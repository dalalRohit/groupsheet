import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	isMobile: false,
	client: null,
	ip: null,
}

const genSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {},
})

export const {} = genSlice.actions
export const genSelector = (state) => state.flash
export default genSlice.reducer

const actions = genSlice.actions
export const genActions = {
	set: actions.set,
	clear: actions.clear,
}
export const genCreators = {}
