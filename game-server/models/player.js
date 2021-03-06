var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: { type: String, unique: true, index: true }
});

module.exports = mongoose.model('Player', PlayerSchema);