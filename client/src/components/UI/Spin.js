import React from 'react'
import { Spinner } from 'reactstrap'
export default function Spin(props) {
	return props.show ? (
		<div className="spin">
			<Spinner style={{ width: '5rem', height: '5rem' }} />
		</div>
	) : null
}
