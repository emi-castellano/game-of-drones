var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameResultSchema = new Schema({
    result: { type: Boolean },
    player: { type: String }
});

module.exports = mongoose.model('GameResult', GameResultSchema);