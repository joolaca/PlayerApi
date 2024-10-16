const request = require('supertest');
const { app, server } = require('../server');
const {connection} = require("mongoose");

describe('Player API', () => {
    let playerId;

    beforeAll(async () => {
        const response = await request(app).post('/player').send({
            name: 'Test Player',
            gold: 150,
            inventory: [],
        });
        playerId = response.body._id;
    });

    afterAll(async () => {
        await connection.close();
        server.close();
    });

    // GET /player/:id teszt
    it('should fetch player data by ID', async () => {
        const response = await request(app).get(`/player/${playerId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Test Player');
    });

    // POST /player/:id/purchase-item teszt
    it('should purchase an item', async () => {
        const response = await request(app)
            .post(`/player/${playerId}/purchase-item`)
            .send({ item: { itemName: 'Sword', quantity: 1 } });
        expect(response.statusCode).toBe(200);
        expect(response.body.inventory).toHaveLength(1);
    });

    // POST /player/:id/delete-item teszt
    it('should delete an item', async () => {
        const response = await request(app)
            .post(`/player/${playerId}/delete-item`)
            .send({ itemName: 'Sword' });
        expect(response.statusCode).toBe(200);
        expect(response.body.inventory).toHaveLength(0);
    });

});
