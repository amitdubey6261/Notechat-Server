const app = require('./app.js');
const connectdatabse = require('./config/database.js');

connectdatabse();

app.listen( process.env.PORT , ()=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`)
})