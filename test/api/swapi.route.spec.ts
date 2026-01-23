const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Film = require('../../models/film.model.js')

describe('pruebas sobre la API de test', () => {
//importante conectarnos a la bd a usar swapiTest
    beforeAll(async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/swapiTest");
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

    describe('POST /api/films', () => {
        const newFilm = {
            title: 'la lombriz humana',
            director: 'Scorcese',
            productor: 'Gary Kurtz',
        }
        const wrongFilm = { title: 'la lombriz humana' }
        
        //borrar los registros de las pruebas echos
        afterAll(async () => {
            await Film.deleteMany({ title: 'la lombriz humana' });
        })

        it('la ruta funciona almneos', async () => {
            const response = await request(app).post('/api/films/').send(newFilm);

            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toContain('json')
        })

        it('se inserto correctamente', async () => {
            const response = await request(app).post('/api/films').send(newFilm);

            expect(response.body._id).toBeDefined();
            expect(response.body.title).toBe(newFilm.title);
        })

        //una insercion que esperamos que falle
        it('Error en la insercion', async () => {
            const response = await request(app).post('/api/films').send(wrongFilm);

            //esperamos que haya fallado algo
            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();
        })

    })

})