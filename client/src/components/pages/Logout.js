import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { userCreators } from './../../store/slices/usersRed'
export default function Logout() {
	const dispatch = useDispatch()
	// const { auth } = useSelector(userSelector)

	useEffect(() => {
		dispatch(userCreators.logoutUser())
	})
	return <Redirect to="/login" />
}
