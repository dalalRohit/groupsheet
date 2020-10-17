import React from 'react'
import Layout from './../Layout/layout'
import Spin from './../UI/Spin'

import { useSelector } from 'react-redux'
import { userSelector } from './../../store/slices/usersRed'
import { Redirect } from 'react-router'
import UserForm from './../Forms/UserForm'

export default function Login() {
	const { auth, loading } = useSelector(userSelector)

	if (auth) {
		return <Redirect to="/app" />
	}
	return loading ? (
		<Spin show={loading} />
	) : (
		<Layout>
			<UserForm login={true} />
		</Layout>
	)
}
