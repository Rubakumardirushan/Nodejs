
const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URl).then((con) => {
        console.log('MongoDB Connection Successful' + con.connection.host);
    }).catch((err) => {
        console.log('MongoDB Connection Failed');
    });


};
module.exports = connectDatabase;