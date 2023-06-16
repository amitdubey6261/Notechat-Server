const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cookieparser = require('cookie-parser');
const cloudinary = require('cloudinary');

const errorMiddleware = require('./middleware/error');

dotenv.config({path:'./config/config.env'});

app.use(cookieparser());

app.use(express.json({
    limit : '500mb'
}));

app.use(express.urlencoded({
    limit : '500mb',
    extended : true 
}))

app.use("*" , cors({
    origin : true , 
    credentials : true , 
}));

app.use(fileUpload())

const user = require('./routes/userRoute');
const notes = require('./routes/notesRoutes');
const payments = require('./routes/paymentRoute');
const email = require('./routes/emailRoutes');
const cart = require('./routes/cartRoutes');
const unlock = require('./routes/unlockNotesRoutes');

app.use('/api/v1' , payments );
app.use('/api/v1' , user );
app.use('/api/v1' , notes);
app.use('/api/v1' , email );
app.use('/api/v1' , cart );
app.use('/api/v1' , unlock);

app.use(errorMiddleware);

module.exports = app ; 