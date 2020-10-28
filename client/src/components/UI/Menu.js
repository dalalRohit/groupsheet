import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { groupMenuLinks, taskLinks } from './../../config'
import {
	Menu,
	IconButton,
	MenuItem,
	Divider,
	Typography,
} from '@material-ui/core'
import Notification from './Notification'
export default function MenuComp(props) {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	let links
	let render
	const { where, defIcon, children } = props

	switch (where) {
		case 'group':
			links = groupMenuLinks
			break
		case 'notifs':
			render = [...new Array(12)].map((x) => {
				return <Notification>{x}</Notification>
			})
			break
		case 'task':
			links = taskLinks
			break
	}
	return (
		<>
			{!defIcon ? (
				<IconButton aria-label="" onClick={handleClick}>
					{children}
					{/* <MoreVertIcon color="inherit" /> */}
				</IconButton>
			) : (
				<IconButton onClick={handleClick}>
					<MoreVertIcon color="inherit" />
				</IconButton>
			)}
			<Menu
				id="myCoolMenu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className="myMenu"
			>
				{links &&
					links.map((link) => {
						return (
							<MenuItem key={Math.random()} onClick={handleClose}>
								{link.name}
							</MenuItem>
						)
					})}

				{render && (
					<>
						<Typography color="textPrimary">Notifications</Typography>
						<Divider />
						{render.map((x) => {
							return x
						})}
					</>
				)}
			</Menu>
		</>
	)
}
