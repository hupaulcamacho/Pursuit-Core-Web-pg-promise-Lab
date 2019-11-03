const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

// Routes
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

// Using the routers
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use('/', (request, response) => {
    response.send('Welcome to Facebook');
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})