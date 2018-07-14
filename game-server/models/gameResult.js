var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameResultSchema = new Schema({
    winner: { type: String }
});

module.exports = mongoose.model('GameResult', GameResultSchema);