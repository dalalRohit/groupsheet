import React, { useEffect, useState } from 'react'
import Modal from './../UI/Modal'
import CreateGroup from './Forms/CreateGroup'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { creators, selectors } from './../../store/slices/rootReducer'
import Spin from './../UI/Spin'
import { Link } from 'react-router-dom'
import { single } from './../../store/slices/groupRed'

export default function GroupList(props) {
	const dispatch = useDispatch()

	const [modal, setModal] = useState(false)
	const { fetching, groups } = useSelector(selectors.grpSelector)
	const toggle = () => setModal(!modal)

	const { width } = props
	useEffect(() => {
		dispatch(creators.getGroupsForUser())
	}, [])
	/*
	return (
		<div className="groups">
			{groups && groups.length ? (
				!fetching ? (
					<>
						<h1>GroupList</h1>
						{groups.map((group) => {
							return width < 768 ? (
								<div className="group-name" key={group.group_id}>
									<Link
										onClick={() => dispatch(single(group))}
										to={`/group/${group.group_id}`}
									>
										{group.grp_name}
									</Link>
								</div>
							) : (
								<div className="group-name" key={group.group_id}>
									<p onClick={() => dispatch(single(group))}>
										{group.grp_name}
									</p>
								</div>
							)
						})}
					</>
				) : (
					<Spin show={fetching} />
				)
			) : (
				<>
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
				</>
			)}
		</div>
	)
	*/

	if (fetching) return <Spin show={fetching} />

	return groups && groups.length ? (
		<>
			<h1>GroupList</h1>
			{groups.map((group) => {
				return width < 768 ? (
					<div className="group-name" key={group.group_id}>
						<Link
							onClick={() => dispatch(single(group))}
							to={`/group/${group.group_id}`}
						>
							{group.grp_name}
						</Link>
					</div>
				) : (
					<div className="group-name" key={group.group_id}>
						<p onClick={() => dispatch(single(group))}>{group.grp_name}</p>
					</div>
				)
			})}
		</>
	) : (
		<>
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
		</>
	)
}
