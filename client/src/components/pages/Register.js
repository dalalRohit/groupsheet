import React from 'react'
import Layout from './../Layout/layout'
import UserForm from './../Forms/UserForm'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { selectors } from '../../store/slices/rootReducer'
import Spin from '../UI/Spin'
export default function Register() {
	const { register, loading } = useSelector(selectors.userSelector)

	if (register) {
		return <Redirect to="/login" />
	}
	return loading ? (
		<Spin show={loading} />
	) : (
		<Layout>
			<UserForm login={false} />
		</Layout>
	)
}
