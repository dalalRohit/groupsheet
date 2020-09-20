import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from './../Layout/appLayout'
import { Col, Row } from 'reactstrap'
import Modal from './../UI/Modal'

export default function Group(props) {
	const [modal, setModal] = useState(false)

	const toggle = () => setModal(!modal)
	let { id } = useParams()
	const { partial, grpId } = props
	const render = (
		<>
			<h1>Group ID : {grpId}</h1>

			<div className="buttons">
				<div className="credit" onClick={toggle}>
					CREDIT
					{modal ? <Modal credit={true} modal={modal} toggle={toggle} /> : null}
				</div>
				<div className="debit" onClick={toggle}>
					DEBIT
					{modal ? (
						<Modal credit={false} modal={modal} toggle={toggle} />
					) : null}
				</div>
			</div>
		</>
	)
	return !partial ? <AppLayout brand={false}>{render}</AppLayout> : render
}
