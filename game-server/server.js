var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/game')

var Player = require('./models/player');
var GameResult = require('./models/gameResult');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Welcome to my API' });
});

function getPlayer(name) {
    return Player.findOne({ name: name }, 'name', function (err, player) {
        if (err) return err;
    });
}

async function insertPlayers(player1, player2, req, res) {
    try {
        let checkedPlayer1 = await getPlayer(player1.name);
        let checkedPlayer2 = await getPlayer(player2.name);

        if (checkedPlayer1 === null) {
            player1.save(err => {
                if (err) res.json({ response: 'INSERT_ERROR', message: 'An error has ocurred while creating a player' });
            });
            if (checkedPlayer2 === null) {
                player2.save(err => {
                    if (err) res.json({ response: 'INSERT_ERROR', message: 'An error has ocurred while creating a player' });
                });
            } else {
                res.json({ response: 'REPEATED_PLAYER', message: 'The name ' + player2.name + ' already exists' });
            }
        } else {
            res.json({ response: 'REPEATED_PLAYER', message: 'The name ' + player1.name + ' already exists' });
        }

        res.json({ response: 'PLAYERS_CREATED', message: 'Players created successfully.' });
    } catch (err) {
        console.log(err);
    }
}

router.route('/register-players')
    .post(function (req, res) {
        let player1 = new Player();
        player1.name = req.body.player1;
        let player2 = new Player();
        player2.name = req.body.player2;

        insertPlayers(player1, player2, req, res);
    });

router.route('/set-results')
    .post(function (req, res) {
        try {
            var gameResults = [
                { result: false, player: req.body.loser },
                { result: true, player: req.body.winner },
            ]

            GameResult.collection.insert(gameResults, (err, docs) => {
                if (err) res.json({ response: 'INSERT_ERROR', message: 'Couldnt add the game result' });
            });
        
            res.json({ response: 'RESULTS_ADDED', message: 'The results were saved successfully.' });
        } catch (err) {
            console.log(err);
        }
    });

router.get('/games-results', function (req, res) {
    try {
        GameResult.aggregate([
            {
                $match: {
                    result: true
                },
            },
            {
                $group: {
                    _id: { 
                        player : "$player" 
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]).then((data) => {
            res.json({ results: data });
        })
    } catch (err) {
        console.log(err);
    }
});

app.use('/api', router);

app.listen(port);
console.log('Magic gappens on port' + port);