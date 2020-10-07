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
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import Menu from './../UI/Menu'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 2,
	},
}))

const TopBar = (props) => {
	const { group } = useSelector(selectors.grpSelector)
	const { auth, user } = useSelector(selectors.userSelector)

	const classes = useStyles()
	const { currentGroup, width, fetching } = props

	const [sidebar, setDrawer] = useState(false)

	const toggleDrawer = () => {
		setDrawer(!sidebar)
	}

	const GroupName = ({ grp }) => {
		return (
			<>
				<AccountCircleIcon
					edge="start"
					className={classes.menuButton}
					fontSize="large"
				/>
				<Typography className={classes.title} variant="h5">
					{grp}
				</Typography>
			</>
		)
	}
	const ChatBar = (data) => {
		const { group } = data
		const { grp_name } = group
		return (
			<div className="chatbar">
				<AppBar color="transparent" position="static">
					<Toolbar>
						<GroupName grp={grp_name} />
						<Menu where="group" />
					</Toolbar>
				</AppBar>
			</div>
		)
	}

	return (
		<Grid container style={{ flexGrow: 1 }} className="appbar-wrapper">
			<Grid item md={4} xs={12}>
				<div className="appbar">
					<Drawer
						auth={auth}
						user={user}
						toggle={toggleDrawer}
						open={sidebar}
					/>
					<AppBar position="static">
						<Toolbar>
							{fetching ? null : currentGroup ? (
								<>
									<Link to="/app">
										<IconButton color="inherit" className={classes.menuButton}>
											<ArrowBackIcon />
										</IconButton>
									</Link>
									<GroupName grp={group.grp_name} />
									<Menu where="group" />
								</>
							) : (
								<>
									<IconButton
										edge="start"
										className={classes.menuButton}
										color="inherit"
										aria-label="menu"
										onClick={toggleDrawer}
									>
										<MenuIcon />
									</IconButton>
									<Typography variant="h6" className={classes.title}>
										GroupSheet
									</Typography>
									{/* Notifications */}
									<NotificationsIcon />
								</>
							)}
						</Toolbar>
					</AppBar>
				</div>
			</Grid>

			{width >= 960 && group ? (
				<Grid item sm={0} md={8}>
					<ChatBar group={group} />
				</Grid>
			) : null}
		</Grid>
	)
}

export default React.memo(TopBar)
