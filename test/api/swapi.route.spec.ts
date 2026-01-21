const request = require('supertest');
const app = require('../../app');

describe('pruebas sobre la API de test',()=>{

let response;
beforeEach(async()=>{
  response = await request(app).get('/api/swapi').send();

})

    describe('GET /api/swapiTest', () =>{
        it('la ruta funciona', async ()=>{
            const response = await request(app).get('/api/swapiTest').send();
            
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La peticion nos devuelve un array de Swapi',async()=>{
            const response = await request(app).get('/api/swapiTest').send();
            expect(response.body).toBeInstanceOf(Array);
        })
    });

})