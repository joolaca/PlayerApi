const mongoose = require('mongoose');
const  defaultPlayer  = require('../constants/playerDefaults');

const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, default: defaultPlayer.DEFAULT_PLAYER_NAME, },
    gold: { type: Number, required: true, default: 0 },
    inventory: [itemSchema],
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
