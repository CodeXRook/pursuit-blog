const express = require('express');
const bodyParser = require('body-parser');
const {loginChecker} = require('./middleware/middleware')

//const userApp = require('./routes/user').userApp
const {publicuserApp} = require('./routes/publicuser')
const {privateuserApp} = require('./routes/privateuser')


// const userApp = require('./routes/user').userApp

const app = express();
const port = 4000;

// middleware
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

// route
app.use('/user',publicuserApp)

// middleware
app.use(loginChecker)//headers

// route
app.use('/user',privateuserApp) //body


app.listen(port,()=>{
    console.log(`listening on port: ${port}`)
})
