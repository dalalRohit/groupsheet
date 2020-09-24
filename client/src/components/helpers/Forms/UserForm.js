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
		name: 'username',
		type: 'text',
		label: 'Enter your username',
		placeholder: 'Enter your username',
	},
	{
		id: 23082913,
		name: 'password',
		type: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
]
const loginSchema = Yup.object().shape({
	username: Yup.string().required('Username is Required'),
	password: Yup.string()
		.min(6, 'Minimum 6 chars')
		.required('Password is Required'),
})

//REGISTER DATA
const regInputs = [
	{
		id: 3901238,
		name: 'username',
		type: 'text',
		label: 'Username',
		placeholder: 'Enter username..',
	},
	{
		id: 123,
		name: 'email',
		type: 'email',
		label: 'Email Address',
		placeholder: 'Enter your email',
	},
	{
		id: 42783,
		name: 'password',
		type: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
	{
		id: 27398,
		name: 'password2',
		type: 'password',
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
	const initValues = !props.login
		? {
				username: '',
				password: '',
				email: '',
				password2: '',
		  }
		: { username: '', password: '' }
	const schema = props.login ? loginSchema : regSchema

	const render = (
		<Formik
			initialValues={initValues}
			validationSchema={schema}
			onSubmit={(values) => (props.login ? dispatch(loginUser(values)) : null)}
		>
			{(formProps) => {
				const errors = Array.from(Object.values(formProps.errors))
				return (
					<form onSubmit={formProps.handleSubmit}>
						{inputs.map(({ id, name, placeholder, label, type }) => {
							return (
								<InputGroup key={id}>
									<Label>{label}</Label>
									<Input
										required
										autoComplete="off"
										name={name}
										type={type}
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
							disabled={errors.length ? true : false}
							onClick={formProps.handleSubmit}
						>
							{props.login ? 'Login' : 'Register'}
						</Button>
					</form>
				)
			}}
		</Formik>
	)
	return <div className="user-form">{render}</div>
}
