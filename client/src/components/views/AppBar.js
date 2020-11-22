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

//icons
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'

import { Link, useLocation, useHistory } from 'react-router-dom'
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
	secBg: {
		backgroundColor: theme.palette.info.main,
		color: '#F1FAEE',
	},
	groupName: {
		flexGrow: 2,

		'&:hover': {
			cursor: 'pointer',
			color: theme.palette.info.dark,
		},
	},
}))

const IndexBar = (props) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()
	const { group, details, fetching_details } = useSelector(
		selectors.grpSelector
	)
	const { auth, user } = useSelector(selectors.userSelector)

	const classes = useStyles()
	const { currentGroup, fetching, width, brand } = props

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
						onClick={() => dispatch(actions.groupActions.setDetails(true))}
						className={classes.groupName}
						variant="h5"
					>
						{grp}
					</Typography>
				)}
			</>
		)
	}

	const GroupBar = (data) => {
		const { group } = data
		const { grp_name } = group
		return fetching ? null : (
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
		)
	}

	const DetailsBar = ({ group }) => {
		return fetching_details ? null : (
			<div className="detailsbar">
				<AppBar className={classes.secBg} color="inherit" position="static">
					<Toolbar>
						{width <= 960 ? (
							<IconButton onClick={() => history.goBack()}>
								<ArrowBackIcon />
							</IconButton>
						) : (
							<IconButton
								onClick={() => dispatch(actions.groupActions.setDetails(false))}
							>
								<CloseIcon />
							</IconButton>
						)}

						<Typography>Group Details of {group.grp_name}</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
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
			{location.pathname === '/app' || (width <= 960 && !group && !details) ? (
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

			{(group && width > 960 && location.pathname === '/app') ||
			(group && width <= 960 && location.pathname.startsWith('/group/')) ? (
				<Grid item xs={12} md={details ? 6 : 9}>
					<GroupBar group={group} />
				</Grid>
			) : null}

			{(details && width <= 960 && location.pathname.startsWith('/details/')) ||
			(details && width > 960 && location.pathname === '/app') ? (
				<Grid item xs={12} md={3}>
					<DetailsBar group={group} />
				</Grid>
			) : null}
		</Grid>
	)
}

export default React.memo(IndexBar)
