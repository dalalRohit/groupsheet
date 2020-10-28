import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { creators } from '../../store/rootReducer'
import { loginInputs, regInputs } from './../../config'
//LOGIN DATA
const loginSchema = Yup.object().shape({
	username: Yup.string().required('Username is Required'),
	password: Yup.string()
		.min(6, 'Minimum 6 chars')
		.required('Password is Required'),
})

//REGISTER DATA
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
			onSubmit={(values) =>
				props.login
					? dispatch(creators.userCreators.loginUser(values))
					: dispatch(creators.userCreators.registerUser(values))
			}
		>
			{(formProps) => {
				const {
					errors,
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					touched,
				} = formProps
				const arrErrors = Array.from(Object.values(errors))
				return (
					<form
						autoComplete="off"
						className="user-form"
						onSubmit={formProps.handleSubmit}
					>
						{inputs.map(({ id, name, placeholder, label, type }) => {
							return (
								<TextField
									key={id}
									variant="outlined"
									label={label}
									required
									autoComplete="off"
									name={name}
									type={type}
									onChange={handleChange}
									value={values[name]}
									onBlur={handleBlur}
									placeholder={placeholder}
									error={touched[name] && errors[name] ? true : false}
									helperText={
										touched[name] && errors[name] ? errors[name] : null
									}
								/>
							)
						})}
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={arrErrors.length ? true : false}
							onClick={handleSubmit}
						>
							{props.login ? 'Login' : 'Register'}
						</Button>
					</form>
				)
			}}
		</Formik>
	)
	return <>{render}</>
}
