var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

//Database connections
require('./db/db')

//Route files
var tasksRouter = require('./routes/tasks')
var usersRouter = require('./routes/users')
var groupsRouter = require('./routes/groups')
var queriesRouter = require('./routes/queries')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)
app.use('/groups', groupsRouter)
app.use('/queries', queriesRouter)
app.use(express.static(path.join(__dirname, 'client/build')))

if (process.env.NODE_ENV === 'production') {
	//serve static content
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	// res.render('error')
	res.send(err.message)
})

module.exports = app
