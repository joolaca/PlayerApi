const PlayerInventoryDto = require("./playerInventoryDto");

class PlayerDataDto {
    constructor({ name, gold, inventory }) {
        this.name = name || 'Unnamed Player';
        this.gold = gold || 0;
        this.inventory = (inventory || []).map(item => new PlayerInventoryDto(item));
    }
}

module.exports = PlayerDataDto;