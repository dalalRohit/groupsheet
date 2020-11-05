import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
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
import Spin from '../UI/Spin'

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
	const location = useLocation()
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
				{width <= 960 ? (
					<Typography className={classes.groupName} variant="h5">
						<Link to={`/details/${group.group_id}`}>{grp}</Link>
					</Typography>
				) : (
					<Typography
						onClick={() => dispatch(actions.groupActions.setGroupDetails())}
						className={classes.groupName}
						variant="h5"
					>
						{grp}
					</Typography>
				)}
			</>
		)
	}
	const ChatBar = (data) => {
		const { group } = data
		const { grp_name } = group
		return fetching ? null : (group &&
				width > 960 &&
				location.pathname === '/app') ||
		  (group && width <= 960 && location.pathname.startsWith('/group/')) ? (
			<div className="chatbar">
				<AppBar color="transparent" position="static">
					<Toolbar>
						{width <= 960 ? (
							<Link to="/app">
								<IconButton>
									<ArrowBackIcon />
								</IconButton>
							</Link>
						) : null}
						<GroupName grp={grp_name} />
						<Menu defIcon={true} where="group" />
					</Toolbar>
				</AppBar>
			</div>
		) : null
	}

	const DetailsBar = ({ group }) => {
		return location.pathname.startsWith('/details/') ? (
			<div className="detailsbar">
				<AppBar color="secondary" position="static">
					<Toolbar>
						{width <= 960 ? 'back icon' : null}
						<IconButton
							onClick={() => dispatch(actions.groupActions.setGroupDetails())}
						>
							<CloseIcon />
						</IconButton>
						<Typography>Group Details of {group.grp_name}</Typography>
					</Toolbar>
				</AppBar>
			</div>
		) : null
	}

	const MainBar = () => {
		return fetching ? null : (!details && !group) ||
		  location.pathname === '/app' ? (
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
			</Toolbar>
		) : null
	}
	return (
		<Grid container style={{ flexGrow: 1 }} className="appbar-wrapper">
			{location.pathname === '/app' ? (
				<Grid item md={3} xs={12}>
					<div className="appbar">
						<Drawer
							auth={auth}
							user={user}
							toggle={toggleDrawer}
							open={sidebar}
						/>
						<AppBar position="static">
							<MainBar />
						</AppBar>
					</div>
				</Grid>
			) : null}

			{group ? (
				<Grid item xs={12} md={details ? 6 : 9}>
					<ChatBar group={group} />
				</Grid>
			) : null}

			{details ? (
				<Grid item md={3}>
					<DetailsBar group={group} />
				</Grid>
			) : null}
		</Grid>
	)
}

export default React.memo(TopBar)
