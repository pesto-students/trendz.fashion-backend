const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

//To Access api from other port no.
app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/v1/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
