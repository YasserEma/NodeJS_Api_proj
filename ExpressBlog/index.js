<<<<<<< HEAD
// require important modules
const express = require('express')
const bodyParser = require('body-parser')

// require routes
const postsRouter = require('./routes/posts')
const categoriesRouter = require('./routes/categories')
const tagsRouter = require('./routes/tags')
const usersRouter = require('./routes/users')

// create our App
const app = express()
const port = process.env.PORT || 5000

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// require the connection (DB)
const db = require('./config/database')

// Home Page
app.get('/', (req,res) => {
  res.send('hello awesomes!')
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1/
app.use('/api/v1/', postsRouter)
app.use('/api/v1/', categoriesRouter)
app.use('/api/v1/', tagsRouter)
app.use('/api/v1/', usersRouter) // /api/v1/users

// Testing the connection
db
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

// START THE SERVER
app.listen(port, () => console.log(`server running on port ${port}`))
=======

require('dotenv').config()
const express = require('express');
const path = require('path');

const cors = require('cors');


const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');


const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started')
})

app.use(cors())
app.use(express.json());

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');


app.use('/api/courses', coursesRouter) // /api/courses

app.use('/api/users', usersRouter) // /api/users

// global middleware for not found router
app.all('*', (req, res, next)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available'})
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})






app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port:');
});
>>>>>>> 7790f6e468934ea8bb598422b78f25f032b2e805
