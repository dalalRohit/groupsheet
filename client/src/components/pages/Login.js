import React from 'react'
import Layout from './../Layout/layout'

import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector } from './../../store/slices/usersRed'
import { Redirect } from 'react-router'
import UserForm from './../helpers/Forms/UserForm'

export default function Login() {
	const dispatch = useDispatch()
	const { auth, loading } = useSelector(userSelector)

	if (auth) {
		return <Redirect to="/app" />
	}
	return loading ? (
		'loading'
	) : (
		<Layout>
			<UserForm login={true} />
		</Layout>
	)
}
