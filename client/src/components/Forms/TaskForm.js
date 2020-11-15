import React from 'react'
import {
	TextField,
	Button,
	Grid,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { debitTypes } from './../../config'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/rootReducer'
//https://github.com/jquense/yup/issues/47#issuecomment-215588412
const taskSchema = Yup.object().shape({
	amt: Yup.number()
		.typeError('Amount must be numbers')
		.positive('Amount must be greater than 0')
		.required('Amount is required'),
	type: Yup.string().required('Select the type..'),
})

export default function TaskForm(props) {
	const [dateTime, setDateTime] = React.useState('')

	const [dateChange, changeDateAlter] = React.useState(false)

	const dispatch = useDispatch()
	const { user } = useSelector(selectors.userSelector)
	const { group } = useSelector(selectors.grpSelector)
	const { credit } = props
	const init = {
		amt: '',
		type: '',
		remark: '',
	}

	//https://stackoverflow.com/questions/31109961/value-of-datetime-local-with-react
	const handleDateTimeChange = (ev) => {
		if (!ev.target['validity'].valid) return
		const dt = ev.target['value']
		setDateTime(dt)
	}
	const formSubmit = (values) => {
		let x = {
			amount: values.amt,
			title: values.type,
			type: credit ? 'CR' : 'DR',
			user_id: user.user_id,
			group_id: group.group_id,
			remark: values.remark,
			date_change: dateChange,
			task_date: dateChange
				? new Date(dateTime).getTime() / 1000.0 //get timestamp from the selected date
				: Date.now() / 1000.0, //get timestamp here as well
		}
		dispatch(creators.taskCreators.addTask(x))
	}
	return (
		<Formik
			initialValues={init}
			validationSchema={taskSchema}
			onSubmit={(values, { resetForm }) => {
				formSubmit(values)
				//https://github.com/formium/formik/issues/446#issuecomment-594104000
				resetForm()
			}}
		>
			{(formProps) => {
				const {
					errors,
					handleChange,
					values,
					handleSubmit,
					touched,
					handleBlur,
				} = formProps
				const arrErrors = Array.from(Object.values(errors))
				return (
					<form
						className="task-form"
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<Grid container>
							<Grid item md={6}>
								<TextField
									name="amt"
									type="text"
									value={values.amt}
									label="Enter amount"
									placeholder="Enter task amount"
									required
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.amt && errors.amt ? true : false}
									helperText={touched.amt && errors.amt ? errors.amt : null}
								/>
							</Grid>
							<Grid item md={6}>
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
							<Grid item md={6} xs={6}>
								<TextField
									name="remark"
									type="text"
									label="Remark"
									placeholder="Enter additional remark"
									value={values.remark}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<FormControlLabel
									control={
										<Checkbox
											checked={dateChange}
											onChange={() => changeDateAlter(!dateChange)}
											name="dateChange"
											color="primary"
										/>
									}
									label="Transaction happened at some other date?"
								/>
							</Grid>
						</Grid>
						{dateChange ? (
							<Grid container>
								<Grid item>
									<TextField
										id="datetime-local"
										label="Select DateTime for the Task"
										type="datetime-local"
										defaultValue="2017-05-24T10:30"
										onChange={handleDateTimeChange}
										value={(dateTime || '').toString().substring(0, 16)}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
							</Grid>
						) : null}

						<Button
							disabled={arrErrors.length ? true : false}
							variant="contained"
							color={credit ? 'primary' : 'secondary'}
							type="submit"
							onClick={handleSubmit}
						>
							{credit ? 'CREDIT' : 'DEBIT'} Task
						</Button>
					</form>
				)
			}}
		</Formik>
	)
}
