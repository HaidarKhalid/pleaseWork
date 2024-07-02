require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// security options 
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// router
const authFunctions = require('./routes/auth')
const jobsFunctions = require('./routes/jobs')

// db connection 
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middlewares 
const authenticationUser = require('./middleware/authentication')

app.use(express.json());

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 *60*1000,
  max:100
}))
app.use(helmet())
app.use(cors())
app.use(xss())


// extra packages

// routes
app.get('/', (req,res)=> {
  res.send('hello this is working')
})
app.use('/api/v1/auth', authFunctions)
app.use('/api/v1/jobs',authenticationUser, jobsFunctions)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

  } catch (error) {
    console.log(error);
  }
};

start();
