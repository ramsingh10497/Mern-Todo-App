const connection = require('./db.js')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const tasks = require('./routes/tasks');

const app = express();
dotenv.config();
connection();


app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cors());
app.use('/api/tasks', tasks);

const port  = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listning on Port ${port}`))

// app.get('/', (req, res) => {
//     console.log("HomePage");
//     res.send("Hello World")
// })