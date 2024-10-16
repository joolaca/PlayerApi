const service = require('../service/playerService');
const Player = require('../models/player');
const errorMessages = require("../constants/playerServiceErrorMessages");
const  defaultPlayer  = require('../constants/playerDefaults');

jest.mock('../models/player');

describe('Player Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createPlayer', () => {
        it('should throw an error if name is empty', async () => {
            await expect(service.createPlayer({name: '', gold: 100, inventory: []}))
                .rejects
                .toThrow(errorMessages.EMPTY_PLAYER_NAME);
        });

        it(`should throw an error if name is default: "${defaultPlayer.DEFAULT_PLAYER_NAME}"`, async () => {
            await expect(service.createPlayer({
                name: Player.schema.path('name').options.default,
                gold: 100,
                inventory: []
            }))
                .rejects
                .toThrow(errorMessages.EMPTY_PLAYER_NAME);
        });

        it('should create a player and return it', async () => {
            const playerData = {name: 'John', gold: 100, inventory: []};
            const mockPlayer = {...playerData, save: jest.fn().mockResolvedValue(playerData)};
            Player.mockImplementation(() => mockPlayer);

            const result = await service.createPlayer(playerData);
            expect(result).toEqual(playerData);
            expect(Player).toHaveBeenCalledWith(playerData);
            expect(mockPlayer.save).toHaveBeenCalled();
        });
    });

    describe('purchaseItem', () => {
        it('should throw an error if player is not found', async () => {
            Player.findById.mockResolvedValue(null);

            await expect(service.purchaseItem('invalid-id', {itemName: 'Sword', gold: 200}))
                .rejects
                .toThrow(errorMessages.PLAYER_NOT_FOUND);
        });

        it('should throw an error if not enough gold', async () => {
            const mockPlayer = {gold: 50, inventory: [], save: jest.fn()};
            Player.findById.mockResolvedValue(mockPlayer);

            await expect(service.purchaseItem('valid-id', {itemName: 'Sword', gold: 200}))
                .rejects
                .toThrow(errorMessages.NOT_ENOUGH_GOLD);
        });

        it('should successfully purchase an item', async () => {
            const mockPlayer = {
                _id: '12345',
                gold: 200,
                inventory: [],
                save: jest.fn()
            };

            mockPlayer.save.mockResolvedValue({
                ...mockPlayer,
                gold: 100,
                inventory: [{itemName: 'Sword'}]
            });

            Player.findById = jest.fn().mockResolvedValue(mockPlayer);

            const item = {itemName: 'Sword', gold: 100};

            const result = await service.purchaseItem('12345', item);

            expect(result.inventory).toContainEqual({itemName: 'Sword'});
            expect(result.gold).toBe(100);
            expect(mockPlayer.save).toHaveBeenCalled();
        });
    });

    describe('deleteItem', () => {
        it('should throw an error if player is not found', async () => {
            Player.findById.mockResolvedValue(null);

            await expect(service.deleteItem('invalid-id', 'Sword'))
                .rejects
                .toThrow(errorMessages.PLAYER_NOT_FOUND); // Error üzenet innen jön
        });

        it('should delete an item and return updated player', async () => {
            const mockPlayer = {
                inventory: [{itemName: 'Sword'}],
                save: jest.fn().mockResolvedValue({inventory: []})
            };
            Player.findById.mockResolvedValue(mockPlayer);

            const result = await service.deleteItem('valid-id', 'Sword');
            expect(result).toEqual({inventory: []});
            expect(mockPlayer.inventory).toHaveLength(0);
            expect(mockPlayer.save).toHaveBeenCalled();
        });
    });
});
