var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/game')

var Player = require('./models/player');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Welcome to my API' });
});

router.route('/register-players')
    .post(function (req, res) {
        var addedPlayers = 0;
        var player1 = new Player();
        player1.name = req.body.player1;
        var player2 = new Player();
        player2.name = req.body.player2;

        player1.save(function (err) {
            if (err)
                res.send(err);
            addedPlayers + 1;
        });

        player2.save(function (err) {
            if (err)
                res.send(err);
            addedPlayers + 1;
        });

        res.json({ message: 'Players created', playersCreated: addedPlayers });
    });

app.use('/api', router);

app.listen(port);