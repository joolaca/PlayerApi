const playerService = require('../service/playerService');
const PlayerDataDto  = require('../dto/playerDataDto');

const handleError = (res, err, statusCode = 500, message = err.message) => {
    return res.status(statusCode).json({ message });
};

// GET /player/:id
exports.getPlayerById = async (req, res) => {
    try {
        const player = await playerService.getPlayerById(req.params.id);
        res.json(player);
    } catch (err) {
        handleError(res, err);
    }
};

// POST /player
exports.createPlayer = async (req, res) => {
    try {
        const playerData = new PlayerDataDto(req.body);
        const savedPlayer = await playerService.createPlayer(playerData);
        res.status(201).json(savedPlayer);
    } catch (err) {
        handleError(res, err, 400);
    }
};

// POST /player/:id/purchase-item
exports.purchaseItem = async (req, res) => {
    try {
        const updatedPlayer = await playerService.purchaseItem(req.params.id, req.body.item);

        res.json(updatedPlayer);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

// POST /player/:id/delete-item
exports.deleteItem = async (req, res) => {
    try {
        const updatedPlayer = await playerService.deleteItem(req.params.id, req.body.itemName);

        res.json(updatedPlayer);
    } catch (err) {
        handleError(res, err);
    }
};
