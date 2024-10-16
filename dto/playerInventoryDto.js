class PlayerInventoryDto {
    constructor({ itemName, quantity }) {
        this.itemName = itemName || 'Unnamed Item';
        this.quantity = quantity || 0;
    }
}

module.exports = PlayerInventoryDto;