const mongoose = require('mongoose');

const connectdatabase = () =>{
    mongoose.connect(process.env.DB_URI ,{
        useUnifiedTopology: true
    } ).then((res)=>{
        console.log(`mongoose connected with server : ${res.connection.host}`)
    }).catch((e)=>{
        console.log(e);
    })
}

module.exports = connectdatabase;