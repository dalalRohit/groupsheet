import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { groupMenuLinks, taskLinks } from './../../config'
import { Menu, IconButton, MenuItem } from '@material-ui/core'
export default function MenuComp(props) {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	let links = []
	const { where } = props
	switch (where) {
		case 'group':
			links = groupMenuLinks
			break
		case 'task':
			links = taskLinks
			break
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreVertIcon color="inherit" />
			</IconButton>
			<Menu
				id="myCoolMenu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{links.map((link) => {
					return (
						<MenuItem key={Math.random()} onClick={handleClose}>
							{link.name}
						</MenuItem>
					)
				})}
			</Menu>
		</>
	)
}
