**Al descargar el repositorio ejecutar**
Con esto tendras las librerias instaladas
-- npm install

**Para empezar a ejecutar el servicio de la API usar**
-- npm run dev

**Para ejecutar las pruebas ejecutar**
-- npm test

**Si modificas algo del swagger ejecuta esto para que se guarde**
-- node swagger/swagger.js

Estare usando el puerto
-- 27017

**SI QUIERES INGRESAR A LA DOCUMENTACION USA ESTA RUTA**
Esta ruta te explicara mucho mejor todo el manejo de los EndPoints
**-- http://localhost:3000/doc/**

Esta es la URL base del proyecto, todos los endpoints parten desde aqui.
-- {{baseURL}} = http://localhost:3000

La BD se puede llamar como gustes pero debes crear un .env donde especifiques el nombre
-- conectarse a ella con
\*\*Use swapiTest
//! debe ser con minusculas

luego ejecutar para poder ver los registros:
db.[COLECCION_A_BUSCAR].find() ej.Films

**IMPORTANTE**
Lo recomendable es crear un env donde tener:
-- El nombre de la bd a crear
-- La URL de la API que usaremos
-- El puerto a usar \***\*Pero los tres datos en el codigo lo ponemos como opcional realmente para efectos de evitar la fatiga\*\***


# =========================
# FILMS ENDPOINT
# =========================
### Get for dropdown (select)

- {{baseURL}}/api/films/select
  Ejemplo de la respueta
  [
  {
  "_id": "696fbf8547bca7b4814b30f3",
  "title": "prueba la pelicula"
  },
  {
  "_id": "69725af30a2ddb5f8a75704c",
  "title": "starwars la venganza recargada y con mas fuerza"
  },
  {
  "_id": "697507dcca10e00b16cf63bb",
  "title": "starwars la venganza recargada y con mas poder"
  },
  ]

### Get by Page

- {{baseURL}}/api/films?page=1
  un get para obtener 10 registros con toda su info
  [
  {
  "_id": "696fbf8547bca7b4814b30f3",
  "director": "Antonio Ibarra",
  "productor": "Sasha Montenegro",
  "title": "prueba la pelicula"
  },
  {
  "_id": "69725af30a2ddb5f8a75704c",
  "title": "starwars la venganza recargada y con mas fuerza",
  "director": "Kevin",
  "productor": "Ibarra"
  },
  ...10 objetos mas
  ]

### Get by Id

- {{baseURL}}/api/films/696fbf8547bca7b4814b30f3
  Get para obtener especificamente un registro por su id, pero bastante especifico

### Post

- {{baseURL}}/api/films
  endpoint para insertar usuarios
  {
  "title":"starwars la venganza recargada y con mas poder recargada",
  "director":"Humberto",
  "productor":"un random"
  }

# PUT - Update Film

PUT {{BASE_URL}}/films/{id}
BODY:
{
"title": "A New Hope Updated",
"director": "George Lucas",
"productor": ["Gary Kurtz"]
}

# DELETE - Delete Film

DELETE {{BASE_URL}}/films/{id}

# =========================

# PLANETS ENDPOINT

# =========================

# GET - Select (Dropdown)

GET {{BASE_URL}}/planets/select

# GET - List paginated

GET {{BASE_URL}}/planets?page=1

# GET - By ID

GET {{BASE_URL}}/planets/{id}

# POST - Create Planet

POST {{BASE_URL}}/planets
BODY:
{
"name": "Tatooine",
"diameter": 10465,
"rotationPeriod": 23,
"orbitalPeriod": 304,
"gravity": [{"value":1,"description":"standard"}],
"population": 200000,
"climate": ["arid"],
"terrain": ["desert"],
"waterSurfacePer": 1
}

# PUT - Update Planet

PUT {{BASE_URL}}/planets/{id}
BODY:
{
"name": "Tatooine Updated",
"diameter": 10500,
"population": 210000
}

# DELETE - Delete Planet

DELETE {{BASE_URL}}/planets/{id}

# =========================

# SPECIES ENDPOINT

# =========================

# GET - Select

GET {{BASE_URL}}/species/select

# GET - List paginated

GET {{BASE_URL}}/species?page=1

# GET - By ID

GET {{BASE_URL}}/species/{id}

# POST - Create Specie

POST {{BASE_URL}}/species
BODY:
{
"name": "Wookiee",
"classification": "mammal",
"designation": "sentient",
"averageHeight": 210,
"averageLifeSpan": 400,
"eyeColor": ["blue", "green"],
"hairColor": ["brown"],
"skinColor": ["gray"],
"language": "Shyriiwook",
"homeworld": "OBJECT_ID_PLANET"
}

# PUT - Update Specie

PUT {{BASE_URL}}/species/{id}
BODY:
{
"name": "Tiger",
"classification": "carnivore",
"designation": "fastest",
"averageHeight": 50,
"averageLifeSpan": 20,
"eyeColor": ["orange","black"],
"hairColor": ["orange","brown">],
"skinColor": [
"fair"
],
"language": "tibetian",
"homeworld": "697285db0214a9d8aeca7c26"
}

# DELETE - Delete Specie

DELETE {{BASE_URL}}/species/{id}

# =========================

# STARSHIPS ENDPOINT

# =========================

# GET - Select

GET {{BASE_URL}}/starships/select

# GET - List paginated

GET {{BASE_URL}}/starships?page=1

# GET - By ID

GET {{BASE_URL}}/starships/{id}

# POST - Create Starship

POST {{BASE_URL}}/starships
BODY:
{
"name": "Millennium Falcon",
"model": "YT-1300 light freighter",
"starshipClass": "Light freighter",
"size": 34,
"passengers": 6,
"maxAtmosphericSpeed": 1000,
"hyperdrive": "0.5",
"MGLT": 75,
"weightCapacity": 100000,
"consumables": 730
}

# PUT - Update Starship

PUT {{BASE_URL}}/starships/{id}
BODY:
{
"name": "Millennium Falcon Updated",
"model": "YT-1300"
}

# DELETE - Delete Starship

DELETE {{BASE_URL}}/starships/{id}

# =========================

# VEHICLES ENDPOINT

# =========================

# GET - Select

GET {{BASE_URL}}/vehicles/select

# GET - List paginated

GET {{BASE_URL}}/vehicles?page=1

# GET - By ID

GET {{BASE_URL}}/vehicles/{id}

# POST - Create Vehicle

POST {{BASE_URL}}/vehicles
BODY:
{
"name": "Speeder",
"model": "X-34",
"vehicleClass": "repulsorcraft",
"size": 3,
"passengers": 1,
"maxAtmosphericSpeed": 250,
"weightCapacity": 200,
"consumables": 30
}

# PUT - Update Vehicle

PUT {{BASE_URL}}/vehicles/{id}
BODY:
{
"name": "Speeder Updated",
"model": "X-34"
}

# DELETE - Delete Vehicle

DELETE {{BASE_URL}}/vehicles/{id}

# =========================

# CHARACTERS ENDPOINT

# =========================

# GET - List paginated

GET {{BASE_URL}}/characters?page=1

# GET - Select

GET {{BASE_URL}}/characters/select

# GET - By ID

GET {{BASE_URL}}/characters/{id}

# GET - Search by name

GET {{BASE_URL}}/characters?name=Luke

# POST - Create Character

POST {{BASE_URL}}/characters
BODY:
{
"name": "Luke Skywalker",
"birthDay": "19BBY",
"gender": "male",
"mass": 77,
"height": 172,
"eyeColor": ["blue"],
"hairColor": ["blond"],
"skinColor": ["fair"],
"homeworld": "OBJECT_ID_PLANET",
"films": ["OBJECT_ID_FILM"],
"species": ["OBJECT_ID_SPECIE"],
"starships": ["OBJECT_ID_STARSHIP"],
"vehicles": ["OBJECT_ID_VEHICLE"]
}

# PUT - Update Character

PUT {{BASE_URL}}/characters/{id}
BODY:
{
"name": "Luke Skywalker Updated",
"mass": 80,
"height": 175
}

# DELETE - Delete Character

DELETE {{BASE_URL}}/characters/{id}
