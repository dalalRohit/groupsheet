import React from 'react'
import {
	Drawer,
	makeStyles,
	Divider,
	Avatar,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { authRoutes, routes } from './../../config'
const paperWidth = 240
const useStyles = makeStyles((theme) => ({
	paper: {
		width: paperWidth,
		maxWidth: '100%',
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}))

export default function MyDrawer(props) {
	const classes = useStyles()
	const { toggle, open, user, auth } = props
	const links = auth ? authRoutes : routes
	const Profile = () => {
		return (
			<div className="avatar">
				<Avatar className={classes.large}>{user.username[0]}</Avatar>
				<p>
					Hello <code>{user.username}</code>
				</p>
			</div>
		)
	}
	return (
		<Drawer
			open={open}
			ModalProps={{ onBackdropClick: toggle, keepMounted: true }}
			onEscapeKeyDown={toggle}
			//https://medium.com/@tsubasakondo_36683/create-responsive-drawer-menu-with-react-material-ui-617a42764b69
			classes={{
				paper: classes.paper,
			}}
			onClose={toggle}
		>
			{auth ? <Profile /> : null}
			<Divider />

			<List>
				{links.map(({ name, icon, path }) => {
					return (
						<NavLink key={Math.random()} to={path}>
							<ListItem button>
								<ListItemIcon>{icon}</ListItemIcon>
								<ListItemText>{name}</ListItemText>
							</ListItem>
						</NavLink>
					)
				})}
			</List>
		</Drawer>
	)
}
