import React, { useState } from 'react'
import { Formik } from 'formik'
import { grpSelector, addGroup } from './../../../store/slices/groupRed'
import { useDispatch, useSelector } from 'react-redux'
import { Label, Input, InputGroup, Button, CustomInput } from 'reactstrap'
export default function CreateGroup(props) {
	const [data, setData] = useState({
		name: '',
		budget: 'no',
		budgetAmount: 0,
	})

	const changeInput = (e) => {
		const { name, value } = e.target

		setData({
			...data,
			[name]: value,
		})
	}

	const dispatch = useDispatch()
	return (
		<form className="group-form" onSubmit={() => dispatch(addGroup())}>
			<InputGroup>
				<Label>Group Name</Label>
				<Input type="text" name="name" bsSize="sm" onChange={changeInput} />
			</InputGroup>
			<InputGroup>
				<>
					<Label htmlFor="budget">On Budget?</Label>
					<CustomInput type="switch" name="budget" />
				</>
			</InputGroup>
			<InputGroup>
				<Label>Enter Budget</Label>
				<Input
					type="number"
					name="budgetAmount"
					bsSize="sm"
					onChange={changeInput}
				/>
			</InputGroup>
			<InputGroup>
				<Label>Enter username to add</Label>
				<Input type="text" />
			</InputGroup>
			<Button onClick={() => dispatch(addGroup())}>Create group</Button>
		</form>
	)
}
