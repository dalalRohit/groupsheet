import React from 'react'

const JoinGroup = () => {
	return (
		<>
			<h2>JoinGroup</h2>
		</>
	)
}

const CreateGroup = () => {
	return (
		<>
			<h2>CreateGroup</h2>
		</>
	)
}
export default function GroupForm(props) {
	const { join, create } = props
	return (
		<div>
			{join && <JoinGroup />}
			{create && <CreateGroup />}
		</div>
	)
}
