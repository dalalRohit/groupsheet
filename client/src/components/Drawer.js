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
import { authRoutes } from './../config'
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
	const { children, toggle, open } = props
	const Profile = (username) => {
		return (
			<div className="avatar">
				<Avatar className={classes.large}>U</Avatar>
				<p>
					Hello <code>username</code>
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
			<Profile />
			<Divider />

			<List>
				{authRoutes.map(({ name, icon, path }) => {
					return (
						<NavLink to={path}>
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
