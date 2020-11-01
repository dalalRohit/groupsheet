import React, { useEffect } from 'react'
import Layout from './../Layout/layout'
import UserForm from './../Forms/UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { selectors, actions } from '../../store/rootReducer'
import Spin from '../UI/Spin'
import Flash from '../UI/Flash'
export default function Register() {
	const dispatch = useDispatch()
	const { register, loading } = useSelector(selectors.userSelector)
	const { flash, msg, type, page } = useSelector((state) => state.flash)

	useEffect(() => {
		if (page && page !== 'register') {
			dispatch(actions.flashActions.clear())
		}
	}, [])
	if (register) {
		return <Redirect to="/login" />
	}
	return loading ? (
		<Spin show={loading} />
	) : (
		<Layout>
			{flash && <Flash type={type} msg={msg} />}
			<UserForm login={false} />
		</Layout>
	)
}
