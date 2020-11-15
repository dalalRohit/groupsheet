import React, { useState } from 'react'
import { Tabs, Box, Tab, Typography, AppBar } from '@material-ui/core'

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
const Panel = (props) => {
	const a11yProps = (index) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		}
	}
	const [value, setValue] = useState(0)

	//Destructure props
	const { data } = props
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<>
			<AppBar position="static" color="default">
				{data && data.length ? (
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="tab panel"
						variant="fullWidth"
						indicatorColor="primary"
					>
						{data.map(({ label }, i) => {
							return (
								<Tab color="primary" key={i} label={label} {...a11yProps(i)} />
							)
						})}
					</Tabs>
				) : null}
			</AppBar>

			{data.map(({ label, comp }, i) => {
				return (
					<TabPanel key={label} value={value} index={i}>
						<>{comp}</>
					</TabPanel>
				)
			})}
		</>
	)
}

export default Panel
