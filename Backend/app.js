const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const connectDB = require('../Backend/config/connectDatabase');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

connectDB();
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', roleRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});


app.listen(8000, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});