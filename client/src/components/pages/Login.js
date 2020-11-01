import React, { useEffect } from 'react'
import Layout from './../Layout/layout'
import Spin from './../UI/Spin'

import { useDispatch, useSelector } from 'react-redux'
import { selectors, actions } from './../../store/rootReducer'
import { Redirect } from 'react-router'
import UserForm from './../Forms/UserForm'
import Flash from './../UI/Flash'

export default function Login() {
	const dispatch = useDispatch()
	const { auth, loading } = useSelector(selectors.userSelector)
	const { flash, type, msg, page } = useSelector((state) => state.flash)

	useEffect(() => {
		if (page && page !== 'login') {
			dispatch(actions.flashActions.clear())
		}
	}, [])
	if (auth) {
		return <Redirect to="/app" />
	}
	return loading ? (
		<Spin show={loading} />
	) : (
		<Layout>
			{flash && <Flash type={type} msg={msg} />}
			<UserForm login={true} />
		</Layout>
	)
}
