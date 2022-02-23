const path = require ('path');
require("dotenv").config({path: path.resolve(__dirname, './config.env')})

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet')
const connectDB = require('./src/db/mongoose');


const app = express();

const port = process.env.PORT || '3001';
connectDB();


//middlewares
app.use(helmet())
app.use(express.json())
app.use(cors());

app.use(morgan("tiny"));

//set body bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load routers
const userRouter = require("./src/routers/user.router")


app.use("/v1/user", userRouter)

app.use((req, res, next) => {
    const error = new Error("Resources not found")    
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    handleError(error, res)
})

//Error handler 

const handleError = require("./src/utils/errorHandler")
app.listen(port, '0.0.0.0', () => console.log(`listening on localhost:${port}`))