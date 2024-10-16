
const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

console.log(`IS_DOCKER: ${process.env.IS_DOCKER}`);

if (!process.env.IS_DOCKER) {
    require('dotenv').config({ path: '.env.local' });
}else{
    require('dotenv').config();
}

const config = require('./config/db');

app.use(express.json());

mongoose.connect(config.database)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/player', playerRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };