import React from 'react'
import ReactDOM from 'react-dom'

import './styles/main.scss'
import './styles/App.scss'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import store from './store/configureStore'
import { Provider } from 'react-redux'

/*
//https://blog.logrocket.com/3-ways-to-add-custom-fonts-to-your-material-ui-project/
//This is causing performance hit
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#A8DADC',
		},
		secondary: {
			main: '#E63946',
		},
		info: {
			main: '#457B9D',
		},
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
	},
})
*/
const app = (
	<Provider store={store}>
		<BrowserRouter>
			{/* <ThemeProvider theme={theme}> */}
			<App />
			{/* </ThemeProvider> */}
		</BrowserRouter>
	</Provider>
)
ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
