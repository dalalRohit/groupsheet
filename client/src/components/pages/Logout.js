import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser, userSelector } from './../../store/slices/usersRed'
export default function Logout() {
	const dispatch = useDispatch()
	// const { auth } = useSelector(userSelector)

	useEffect(() => {
		dispatch(logoutUser())
	})
	return <Redirect to="/login" />
}
