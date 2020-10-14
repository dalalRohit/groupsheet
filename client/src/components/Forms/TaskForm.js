import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { debitTypes } from './../../config'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
//https://github.com/jquense/yup/issues/47#issuecomment-215588412
const taskSchema = Yup.object().shape({
	amt: Yup.number()
		.typeError('Amount must be numbers')
		.positive('Amount must be greater than 0')
		.required('Amount is required'),
	type: Yup.string().required('Select the type..'),
})

export default function TaskForm(props) {
	const dispatch = useDispatch()
	const { user } = useSelector(selectors.userSelector)
	const { group } = useSelector(selectors.grpSelector)
	const { credit } = props
	const init = {
		amt: '',
		type: '',
		remark: '',
	}
	const formSubmit = (values) => {
		//let {user_id,group_id,type,title,amount}=req.body;
		let x = {
			amount: values.amt,
			title: values.type,
			type: credit ? 'CR' : 'DR',
			user_id: user.user_id,
			group_id: group.group_id,
			remark: values.remark,
		}
		dispatch(creators.addTask(x))
	}
	return (
		<Formik
			initialValues={init}
			validationSchema={taskSchema}
			onSubmit={(values) => formSubmit(values)}
		>
			{(formProps) => {
				const { errors, handleChange, values, handleSubmit } = formProps
				const arrErrors = Array.from(Object.values(errors))
				return (
					<form
						className="task-form"
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<Grid container>
							<Grid md={6}>
								<TextField
									name="amt"
									type="text"
									value={values.amt}
									label="Enter amount"
									placeholder="Enter task amount"
									required
									onChange={handleChange}
									error={errors.amt ? true : false}
									helperText={errors.amt ? errors.amt : null}
								/>
							</Grid>
							<Grid md={6}>
								<TextField
									id="select-type"
									select
									name="type"
									required
									label="Select type"
									value={values.type}
									onChange={handleChange}
								>
									{debitTypes.map(({ name }) => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
						<Grid container>
							<TextField
								name="remark"
								type="text"
								label="Remark"
								placeholder="Enter additional remark"
								value={values.remark}
								onChange={handleChange}
							/>
						</Grid>

						<Button
							disabled={arrErrors.length ? true : false}
							variant="contained"
							color={credit ? 'primary' : 'secondary'}
							type="submit"
							onClick={handleSubmit}
						>
							Add Task
						</Button>
					</form>
				)
			}}
		</Formik>
	)
}
