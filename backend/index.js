const express = require('express');
const env = require('dotenv/config');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
const app = express();


//Constant Environment Variables.
const api = process.env.API_URL;
const mongoConnectionString = process.env.CONNECTION_STRING;

//Middle Wares
app.use(express.json()); // For Using JSON input in request.
app.use(cors());
app.options('*', cors);
app.use(auth());
app.use(errorHandler);

//Server Requests
app.listen(process.env.PORT, () => { console.log('Server is up and Running') });

//Mongo DB Connections
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'cms' })
    .then(d => console.log('DB Connection ready'))
    .catch(err => console.log(err), console.log(mongoConnectionString));


//Router Connections
const examsRouter = require('./routers/exams');
const eventsRouter = require('./routers/events');
const usersRouter = require('./routers/users');

//Routers
app.use(`/${api}/exams`, examsRouter);
app.use(`/${api}/events`, eventsRouter);
app.use(`/${api}/users`, usersRouter);