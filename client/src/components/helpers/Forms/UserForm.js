import React from 'react'
import * as Yup from 'yup'
import { Formik, ErrorMessage } from 'formik'
import { Button, InputGroup, Input, Label } from 'reactstrap'

import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector } from './../../../store/slices/usersRed'
//LOGIN DATA
const loginInputs = [
	{
		id: 2139,
		name: 'email',
		label: 'Email Address',
		placeholder: 'Enter your email',
	},
	{
		id: 23082913,
		name: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
]
const loginSchema = Yup.object().shape({
	email: Yup.string().email().required('Email-ID is Required'),
	password: Yup.string()
		.min(6, 'Minimum 6 chars')
		.required('Password is Required'),
})

//REGISTER DATA
const regInputs = [
	{
		id: 3901238,
		name: 'username',
		label: 'Username',
		placeholder: 'Enter username..',
	},
	{
		id: 123,
		name: 'email',
		label: 'Email Address',
		placeholder: 'Enter your email',
	},
	{
		id: 42783,
		name: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
	{
		id: 27398,
		name: 'password2',
		label: 'Password Confirm',
		placeholder: 'Enter password again',
	},
]
const regSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	email: Yup.string().email().required('Email-ID is Required'),
	password: Yup.string()
		.min(6, 'Minimum 6 chars')
		.required('Password is Required'),
	password2: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match!'
	),
})

export default function UserForm(props) {
	const dispatch = useDispatch()
	const inputs = props.login ? loginInputs : regInputs
	const initValues = props.login
		? {
				username: '',
				password: '',
				email: '',
				password2: '',
		  }
		: { email: '', password: '' }
	const schema = props.login ? loginSchema : regSchema

	const render = (
		<Formik
			initialValues={initValues}
			validationSchema={schema}
			onSubmit={(values) => (props.login ? dispatch(loginUser()) : null)}
		>
			{(formProps) => {
				return (
					<>
						{inputs.map(({ id, name, placeholder, label }) => {
							return (
								<InputGroup key={id}>
									<Label>{label}</Label>
									<Input
										required
										autoComplete="off"
										name={name}
										type={name}
										onChange={formProps.handleChange}
										value={formProps.values[name]}
										onBlur={formProps.handleBlur}
										placeholder={placeholder}
									/>
									<ErrorMessage
										name={name}
										render={(msg) => <span className="field-error">{msg}</span>}
									/>
								</InputGroup>
							)
						})}
						<Button
							onClick={() => (props.login ? dispatch(loginUser()) : null)}
						>
							{props.login ? 'Login' : 'Register'}
						</Button>
					</>
				)
			}}
		</Formik>
	)
	return <div className="user-form">{render}</div>
}
