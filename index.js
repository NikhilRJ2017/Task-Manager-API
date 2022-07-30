require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const connectDB = require('./config/db/connect');
const pageNotFound = require('./config/middlewares/page_not_found');
const errorHandler = require('./config/middlewares/error_handler');

//****************** import security packages while deploying *****************/
//helmet
//cors
//xss-clean
//express-mongo-santize
//rate limiter

//****************** importing routes ******************/

const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');

//***************** add security packages while deploying ****************/

//****************** UI - static files ************** */
app.use(express.static('./public'));

// ***************** body parsing middlewares ***********
app.use(express.json())

//****************** cookie parsring middleware *******************/
app.use(cookieParser(process.env.JWT_SECRET_KEY));

//***************** main routes *****************/
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

//***************** Error handling middlewares ****************/
app.use(pageNotFound);
app.use(errorHandler);



// **************** Spinning Up Server only when our DB is connected ************
const PORT = process.env.PORT || 6000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
    } catch (error) {
        console.log(error.message);
    }
}

start();

