const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

describe('pruebas sobre la API de test',()=>{

let response;
beforeEach(async()=>{
  response = await request(app).get('/api/film').send();

})

    describe('GET /api/films', () =>{
        it('la ruta funciona', async ()=>{
            const response = await request(app).get('/api/swapiTest').send();
            
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La peticion nos devuelve un array de Swapi',async()=>{
            //const response = await request(app).get('/api/film').send();
            expect(response.body).toBeInstanceOf(Array);
        })
    });

})