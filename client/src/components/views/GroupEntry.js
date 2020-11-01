import React, { useState } from 'react'
import { Tabs, Box, Tab, Typography, AppBar } from '@material-ui/core'
import GroupForm from './../Forms/GroupForm'

// import MenuItem from '@material-ui/core/MenuItem'
// import * as Yup from 'yup'
// import { Formik } from 'formik'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}
const GroupEntry = () => {
	const a11yProps = (index) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		}
	}
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
					variant="fullWidth"
					indicatorColor="primary"
				>
					<Tab label="Create Group" {...a11yProps(0)} />
					<Tab label="Join Group" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<GroupForm create={true} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<GroupForm join={true} />
			</TabPanel>
		</>
	)
}

export default GroupEntry
