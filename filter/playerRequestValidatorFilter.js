const sendValidationError = (res, message) => res.status(400).json({ error: message });

const validateRequestBodyNotEmpty = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return sendValidationError(res, 'Request body cannot be empty!');
    }
    next();
};

const validateNameField = (req, res, next) => {
    if (!req.body.name || req.body.name.trim() === '') {
        return sendValidationError(res, 'Name field is required!');
    }
    next();
};

const validatePurchaseItemField = (req, res, next) => {
    const { item } = req.body;

    if (!item) {
        return sendValidationError(res, 'Item field is required!');
    }

    const { itemName, quantity } = item;

    if (!itemName || itemName.trim() === '') {
        return sendValidationError(res, 'ItemName field is required!');
    }

    if (!quantity || typeof quantity !== 'number') {
        return sendValidationError(res, 'Quantity field must be a valid number!');
    }

    next();
};
const validateDeleteItemField = (req, res, next) => {
    const { itemName } = req.body;

    if (!itemName) {
        return sendValidationError(res, 'itemName field is required!');
    }

    next();
};

module.exports = {
    validateRequestBodyNotEmpty,
    validateNameField,
    validatePurchaseItemField,
    validateDeleteItemField,
};
