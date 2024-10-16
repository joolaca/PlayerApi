const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const {
    validateRequestBodyNotEmpty,
    validateNameField,
    validatePurchaseItemField,
    validateDeleteItemField,
} = require('../filter/playerRequestValidatorFilter');

// GET /player/:id
router.get('/:id', playerController.getPlayerById);

// POST /player
router.post('/',
    validateRequestBodyNotEmpty,
    validateNameField,
    playerController.createPlayer
);

// POST /player/:id/purchase-item
router.post('/:id/purchase-item',
    validateRequestBodyNotEmpty,
    validatePurchaseItemField,
    playerController.purchaseItem
);

// POST /player/:id/delete-item
router.post('/:id/delete-item',
    validateDeleteItemField,
    playerController.deleteItem
);

module.exports = router;
