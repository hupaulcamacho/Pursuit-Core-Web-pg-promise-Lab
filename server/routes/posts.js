const express = require('express');
const router = express.Router();

const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'twitter_db',
}
const db = pgp(connection);

router.get('/all', (req, res) => {
    db.any('SELECT * FROM posts')
    .then(function(data) {
        const response = {
            posts: data
        }
        res.send(response);
    })
    .catch(function(error) {        
        res.send('An error occurred: ' + error);
    });
});

router.post('/register', (req, res) => {
    const post = req.body;
    db.none('INSERT INTO posts(poster_id, body) VALUES($1, $2)', [post.poster_id, post.body])
    .then(() => {
        let response = {
            addedPost: req
        }
        res.send(response)
    })
    .catch(error => {
        res.send("An error occurred: " + error)
    });
});

module.exports = router;