const Player = require('../models/player');
const PlayerInventoryDto = require("../dto/playerInventoryDto");
const errorMessages = require("../constants/playerServiceErrorMessages");
const  defaultPlayer  = require('../constants/playerDefaults');

const handleError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.status = statusCode;
    throw error;
};

exports.createPlayer = async (playerDataDto) => {
    const { name, gold, inventory } = playerDataDto;

    if (!name || name.trim() === '' || name === defaultPlayer.DEFAULT_PLAYER_NAME) {
        handleError(errorMessages.EMPTY_PLAYER_NAME, 400);
    }

    const player = new Player({
        name,
        gold: gold || 0,
        inventory: inventory || []
    });

    return await player.save();
};

exports.purchaseItem = async (playerId, item) => {
    const player = await Player.findById(playerId);

    const itemPrice = determineItemPrice(item.gold);

    validatePurchase(player, itemPrice);

    const newItem = new PlayerInventoryDto(item);
    player.inventory.push(newItem);
    player.gold -= itemPrice;

    return await player.save();
};

const validatePurchase = (player, itemPrice) => {
    if (!player) {
        handleError(errorMessages.PLAYER_NOT_FOUND, 404);
    }

    if (player.gold < itemPrice) {
        handleError(errorMessages.NOT_ENOUGH_GOLD, 400);
    }
};

const determineItemPrice = (gold) => {
    let itemPrice = 100;
    if (gold !== undefined) {
        const parsedGold = parseFloat(gold);
        if (!isNaN(parsedGold)) {
            itemPrice = parsedGold;
        } else {
            handleError(errorMessages.INVALID_GOLD_VALUE, 400);
        }
    }
    return itemPrice;
};

exports.deleteItem = async (playerId, itemName) => {
    const player = await Player.findById(playerId);

    if (!player) {
        handleError(errorMessages.PLAYER_NOT_FOUND, 404);
    }

    player.inventory = player.inventory.filter(item => item.itemName !== itemName);

    return await player.save();
};

exports.getPlayerById = async (playerId) => {
    const player = await Player.findById(playerId);
    if (!player) {
        handleError(errorMessages.PLAYER_NOT_FOUND, 404);
    }
    return player;
};
