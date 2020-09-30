import React, { useEffect, useState } from 'react'
import Modal from './../UI/Modal'
import CreateGroup from './Forms/CreateGroup'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { creators, selectors } from './../../store/slices/rootReducer'
import Spin from './../UI/Spin'
import Grp from '../UI/Grp'
import { Container, Paper } from '@material-ui/core'

export default function GroupList(props) {
	const dispatch = useDispatch()

	const [modal, setModal] = useState(false)
	const { fetching, groups, group } = useSelector(selectors.grpSelector)
	const toggle = () => setModal(!modal)

	const { width } = props
	useEffect(() => {
		dispatch(creators.getGroupsForUser())
	}, [])

	if (fetching) return <Spin show={fetching} />

	return groups && groups.length ? (
		<div className="groups">
			<h3>Your groups</h3>
			{groups.map((grp) => {
				return <Grp current={group} width={width} group={grp} />
			})}
		</div>
	) : (
		<div className="groups">
			<h5>No groups. Create one</h5>
			<AiOutlinePlusCircle onClick={toggle} size={30} />{' '}
			{modal ? (
				<Modal modal={modal} toggle={toggle} title={'Create Group'}>
					{process ? (
						'adding'
					) : (
						<CreateGroup dispatch={dispatch} addGrp={creators.addGroup()} />
					)}
				</Modal>
			) : null}
		</div>
	)
}
