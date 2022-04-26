const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('dotenv').config();
const port = process.env.PORT || 4000;

require('./DB/conn');

const post = require('./Routes/post.js');
const user = require('./Routes/user.js');

app.use('/post', post);
app.use('/user', user);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});