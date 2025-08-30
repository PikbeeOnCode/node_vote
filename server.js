const express = require('express');
const app = express();
const db = require('./db');
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { jwtAuthmiddleware } = require('./jwt');


const logRequest = (req,res,next) =>{
    console.log(` At : [${new Date().toLocaleDateString()}] request made to : ${req.originalUrl}`);
    next();  // move on to next phase 
}




app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);



app.listen(PORT, () => {
    console.log('Port 3000 is listening!');
});
