import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Spin(props) {
	return props.show ? (
		<div className={'spin'}>
			<CircularProgress />
		</div>
	) : null
}
