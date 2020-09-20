import React, { useState } from 'react'
import Modal from './../UI/Modal'
import CreateGroup from './Forms/CreateGroup'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { grpSelector, addGroup } from './../../store/slices/groupRed'
export default function GroupList(props) {
	const dispatch = useDispatch()
	const [modal, setModal] = useState(false)
	const { process } = useSelector(grpSelector)
	const toggle = () => setModal(!modal)
	return (
		<div className="groups">
			{props.groups ? (
				<h1>GroupList</h1>
			) : (
				<>
					<h5>No groups. Create one</h5>
					<AiOutlinePlusCircle onClick={toggle} size={30} />{' '}
					{modal ? (
						<Modal modal={modal} toggle={toggle} title={'Create Group'}>
							{process ? (
								'adding'
							) : (
								<CreateGroup dispatch={dispatch} addGrp={addGroup} />
							)}
						</Modal>
					) : null}
				</>
			)}
		</div>
	)
}
