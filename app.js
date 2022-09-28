const express= require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const Router = require('./router/routes');
const connectDB = require('./database/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/", Router);

//Connect database
connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server is running. ..");
});