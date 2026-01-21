const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('pruebas sobre la API de test', () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/films");
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/films', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/films').send();
        })

        it('la ruta funciona', async () => {
            const response = await request(app).get('/api/films').send();

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La peticion nos devuelve un array de Films', async () => {
            const response = await request(app).get('/api/films').send();
            expect(response.body).toBeInstanceOf(Array);
        })
    });

})