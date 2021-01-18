const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.PORT
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Route
const blogsRoutes = require('./routes/blogs');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');

const api = process.env.API_URL;

app.use(`${api}/blogs`, blogsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/categories`, categoriesRoutes);




app.get('/', (req, res) => {
     res.send('this is blogs restful api resources');;
});
//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'blogs-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
// app.listen(port, ()=>{

//     console.log(`server is running http://localhost:${port}`);
// })

var server = app.listen(process.env.PORT || 3000, () => {
    var port = server.address().port;
    console.log("express is working on port " + port)
});