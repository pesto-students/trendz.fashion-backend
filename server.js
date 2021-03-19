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

// Test Routes
app.use('/__test', (req, res) => res.json('Hello world'));
app.use('/', (req, res) => res.json('Welcome to Trendz.fashion Backend'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
