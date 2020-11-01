import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	makeStyles,
	Grid,
	Badge,
} from '@material-ui/core'

import Drawer from '../views//Drawer'
import { selectors, actions } from './../../store/rootReducer'

import MenuIcon from '@material-ui/icons/Menu'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'

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
	groupName: {
		flexGrow: 2,

		'&:hover': {
			cursor: 'pointer',
			background: '#eee',
		},
	},
}))

const TopBar = (props) => {
	const dispatch = useDispatch()
	const { group, details } = useSelector(selectors.grpSelector)
	const { auth, user } = useSelector(selectors.userSelector)

	const classes = useStyles()
	const { currentGroup, fetching, width } = props

	const [sidebar, setDrawer] = useState(false)

	const toggleDrawer = () => {
		setDrawer(!sidebar)
	}

	const GroupName = ({ grp }) => {
		return (
			<>
				<PeopleAltOutlinedIcon
					edge="start"
					className={classes.menuButton}
					fontSize="large"
				/>
				<Typography
					onClick={() => dispatch(actions.groupActions.setGroupDetails())}
					className={classes.groupName}
					variant="h5"
				>
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
						<Menu defIcon={true} where="group" />
					</Toolbar>
				</AppBar>
			</div>
		)
	}

	const DetailsBar = ({ group }) => {
		return (
			<div className="chatbar">
				<AppBar color="secondary" position="static">
					<Toolbar>
						<IconButton
							onClick={() => dispatch(actions.groupActions.setGroupDetails())}
						>
							<CloseIcon />
						</IconButton>
						<Typography>Group Details of {group.grp_name}</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
	return (
		<Grid container style={{ flexGrow: 1 }} className="appbar-wrapper">
			<Grid item md={3} xs={12}>
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
									<Menu icon={true} where="group" />
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

									<Menu defIcon={false} label="notifications" where="notifs">
										{/* Notifications */}
										<Badge
											max={9}
											overlap="circle"
											anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
											badgeContent={4}
											color="secondary"
										>
											<NotificationsNoneIcon />
										</Badge>
									</Menu>
								</>
							)}
						</Toolbar>
					</AppBar>
				</div>
			</Grid>

			{width >= 960 && group ? (
				<Grid item sm={1} md={details ? 6 : 9}>
					<ChatBar group={group} />
				</Grid>
			) : null}

			{width >= 960 && details ? (
				<Grid item md={3}>
					<DetailsBar group={group} />
				</Grid>
			) : null}
		</Grid>
	)
}

export default React.memo(TopBar)
