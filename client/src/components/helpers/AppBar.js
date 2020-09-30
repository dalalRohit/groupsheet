import React, { useState } from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	makeStyles,
	Grid,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '../Drawer'
import { selectors } from './../../store/slices/rootReducer'
import { useSelector } from 'react-redux'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

const TopBar = (props) => {
	const { group } = useSelector(selectors.grpSelector)
	const classes = useStyles()
	const { brand, currentGroup } = props
	const [sidebar, toggle] = useState(false)
	const toggleDrawer = () => {
		toggle(!sidebar)
	}

	const ChatBar = (data) => {
		const { group } = data
		const { grp_name } = group
		return (
			<div className="chatbar">
				<AppBar color="transparent" position="static">
					<Toolbar>
						<AccountCircleIcon
							edge="start"
							className={classes.menuButton}
							fontSize="large"
						/>
						<Typography className={classes.title} variant="h4">
							{grp_name}
						</Typography>
						<MoreVertIcon />
					</Toolbar>
				</AppBar>
			</div>
		)
	}
	return (
		<Grid container className="appbar-wrapper">
			<Grid item md={4}>
				<div className="appbar">
					<Drawer toggle={toggleDrawer} open={sidebar} />
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer}
							>
								<MenuIcon />
							</IconButton>
							{currentGroup ? (
								'back'
							) : (
								<Typography variant="h6" className={classes.title}>
									GroupSheet
								</Typography>
							)}

							{/* Notifications */}
							<NotificationsIcon />
						</Toolbar>
					</AppBar>
				</div>
			</Grid>

			{group ? (
				<Grid item md={8}>
					<ChatBar group={group} />
				</Grid>
			) : null}
		</Grid>
	)
}

export default TopBar
