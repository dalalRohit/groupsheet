import React, { useEffect } from 'react'
import AppLayout from './../Layout/appLayout'
import { Slide } from '@material-ui/core'
import { useParams } from 'react-router-dom'
export default function Detail() {
	const [checked, setChecked] = React.useState(false)

	const handleChange = () => {
		setChecked((prev) => !prev)
	}
	const { id } = useParams()

	return (
		<Slide direction="left" mountOnEnter unmountOnExit>
			GroupDetails
		</Slide>
	)
}
