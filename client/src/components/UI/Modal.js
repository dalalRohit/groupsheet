import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalExample = (props) => {
	const { credit, modal, toggle } = props
	const taskRender = (
		<>
			<input type="text" />
			<input type="text" />
			<Button>Add Task</Button>
		</>
	)

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>{props.title}</ModalHeader>
			<ModalBody>{props.children}</ModalBody>
		</Modal>
	)
}

export default ModalExample
