# SWAPI API

Sistema backend para gestión de datos de Star Wars: films, planets, species, starships, vehicles y characters.  
Incluye endpoints RESTful, documentación Swagger y base de datos MongoDB.

## Descripción general

Este proyecto ofrece una API para acceder y manipular información del universo Star Wars, incluyendo películas, planetas, especies, naves espaciales, vehículos y personajes.

La arquitectura incluye:

- **Backend (Node.js + Express)**: API RESTful para toda la lógica de negocio y conexión a la base de datos.
- **Base de datos (MongoDB)**: almacenamiento principal de los registros.
- **Swagger**: documentación interactiva de los endpoints.
- **Testing (Jest)**: pruebas unitarias y de integración.

---

## Tecnologías utilizadas

- **Node.js** → Entorno de ejecución backend.
- **Express** → Framework web para manejo de rutas y middleware.
- **MongoDB** → Base de datos NoSQL para persistencia de datos.
- **Mongoose** → ODM para modelar los datos de MongoDB.
- **Swagger** → Documentación de API interactiva.
- **Jest** → Testing de endpoints.
- **dotenv** → Configuración de variables de entorno.

---

## Instrucciones iniciales

**Al descargar el repositorio ejecutar**  
Instala las librerías necesarias:

```bash
npm install
```

**Para empezar a ejecutar el servicio de la API**

```bash
npm run dev
```

**Para ejecutar las pruebas**

```bash
npm test
```

**Si modificas algo del Swagger para que se guarde**

```bash
node swagger/swagger.js
```

**Puerto usado**  
```bash
27017
```

**Documentación Swagger**  
http://localhost:3000/doc/

**URL base del proyecto**  
Todos los endpoints parten desde aquí:  
{{baseURL}} = http://localhost:3000

**Base de datos**  
Se puede llamar como gustes, pero debes crear un `.env` donde especifiques el nombre:

```bash
Use swapiTest
```

Para ver los registros:

```bash
db.[COLECCION_A_BUSCAR].find()
```

**IMPORTANTE**  
Se recomienda crear un `.env` con:

- Nombre de la base de datos
- URL de la API
- Puerto a usar
  > Los tres datos en el código son opcionales para evitar fatiga.

---

# Characters Endpoint

### GET - List paginated

```bash
GET {{baseURL}}/characters?page=1
```
```json
Body
[
    {
        "_id": "697bafe6b8901ec66fd4fa42",
        "name": "Ackbar",
        "birthDay": "41BBY",
        "gender": "male",
        "mass": "83",
        "height": 180,
        "hairColor": [
            "none"
        ],
        "eyeColor": [
            "orange"
        ],
        "skinColor": [
            "brown mottle"
        ],
        "films": [
            {
                "_id": "697bafe6b8901ec66fd4f9fc",
                "title": "Return of the Jedi"
            }
        ],
        "species": [
            {
                "_id": "697bafe6b8901ec66fd4f94d",
                "name": "Mon Calamari"
            }
        ],
        "starships": [],
        "vehicles": [],
        "swapiUrl": "https://swapi.info/api/people/27",
        "homeworld": {
            "_id": "697bafe6b8901ec66fd4f9a4",
            "name": "Mon Cala"
        }
    },
    {
        "_id": "697bafe6b8901ec66fd4fa5e",
        "name": "Adi Gallia",
        "birthDay": "unknown",
        "gender": "female",
        "mass": "50",
        "height": 184,
        "hairColor": [
            "none"
        ],
        "eyeColor": [
            "blue"
        ],
        "skinColor": [
            "dark"
        ],
        "films": [
            {
                "_id": "697bafe6b8901ec66fd4f9fd",
                "title": "The Phantom Menace"
            },
            {
                "_id": "697bafe6b8901ec66fd4f9ff",
                "title": "Revenge of the Sith"
            }
        ],
        "species": [
            {
                "_id": "697bafe6b8901ec66fd4f95c",
                "name": "Tholothian"
            }
        ],
        "starships": [],
        "vehicles": [],
        "swapiUrl": "https://swapi.info/api/people/55",
        "homeworld": {
            "_id": "697bafe6b8901ec66fd4f97b",
            "name": "Coruscant"
        }
    },....
]

```
### GET - Select

```bash
GET {{baseURL}}/characters/select
```

```json
Body
[
    {
        "_id": "697bafe6b8901ec66fd4fa29",
        "name": "Luke Skywalker"
    },
    {
        "_id": "697bafe6b8901ec66fd4fa2a",
        "name": "C-3PO"
    },....
]
```

### GET - By ID

```bash
GET {{baseURL}}/characters/{id}
```

### POST - Create Character

```bash
POST {{baseURL}}/characters
```

```json
Body:
{
  "name":"Maria jkwow la Dopplejnager PARA BORRAR LA INFO",
  "birthDay":"9BBY",
  "gender":"female",
  "mass":"197",

  "hairColor":["brown","pink"],
  "eyeColor":["green","black"],
  "skinColor":["fair"],

  "homeworld":"697281b3f14d2f2599de8e34",
  "films":["69725af30a2ddb5f8a75704c","696fbf8547bca7b4814b30f3","69751dd8e5ef5de85e19a257"],
  "species":"6973b719545b85d0ac5c82b5",
  "starships":["6973d624bb237088f2eb5db3","697520ade5ef5de85e19a271"],
  "vehicles": ["6973e0d4663cc606e4a47304","6973e1e1663cc606e4a4730b"],
}
```

### PUT - Update Character

```json
Body:
{
  "name":"Maria jkwow la Dopplejnager",
  "birthDay":"900000BBY",
  "gender":"female",
  "mass":"1970000",

  "hairColor":["brown","pink"],
  "eyeColor":["green","black"],
  "skinColor":["fair"],

  "homeworld":"697281b3f14d2f2599de8e34",
  "films":["69725af30a2ddb5f8a75704c","696fbf8547bca7b4814b30f3","69751dd8e5ef5de85e19a257"],
  "species":"6973b719545b85d0ac5c82b5",
  "starships":["6973d624bb237088f2eb5db3","697520ade5ef5de85e19a271"],
  "vehicles": ["6973e0d4663cc606e4a47304","6973e1e1663cc606e4a4730b"]
}
```

### DELETE - Delete Character

```bash
DELETE {{baseURL}}/characters/{id}
```
```json
{"Result Code " : 200}
```

# Films Endpoint

### **Get for dropdown (select)**

```bash
GET {{baseURL}}/api/films/select
```

```json
Body:
[
  {"_id": "696fbf8547bca7b4814b30f3", "title": "prueba la pelicula"},
  {"_id": "69725af30a2ddb5f8a75704c", "title": "starwars la venganza recargada y con más fuerza"},
  {"_id": "697507dcca10e00b16cf63bb", "title": "starwars la venganza recargada y con más poder"}
]
```

### Get by page

```bash
GET {{baseURL}}/api/films?page=1
```

```json
Body:
[
  {"_id": "696fbf8547bca7b4814b30f3", "director": "Antonio Ibarra", "productor": "Sasha Montenegro", "title": "prueba la pelicula"},
  {"_id": "69725af30a2ddb5f8a75704c", "title": "starwars la venganza recargada y con más fuerza", "director": "Kevin", "productor": "Ibarra"}
]
```

### Get by ID

```bash
GET {{baseURL}}/api/films/696fbf8547bca7b4814b30f3
```

POST - Crear Film

```bash
POST {{baseURL}}/api/films
```

```json
Body:
{
  "title": "A New Hope",
  "director": "George Lucas",
  "productor": [
    "Gary Kurtz",
    "Katy Perry"
  ]
}
```

### PUT - Update Film

```json
Body:
{
  "title": "A New Hope",
  "director": "George Lucas",
  "productor": [
    "Gary Kurtz",
    "Katy Perry"
  ]
}
```

### DELETE - Delete Film

```bash
DELETE {{baseURL}}/films/{id}
```
```json
{"Result Code " : 200}
```

# Planets Endpoint

### GET - Select (Dropdown)

```bash
GET {{baseURL}}/planets/select
```

### GET - List paginated

```bash
GET {{baseURL}}/planets?page=1
```

### GET - By ID

```bash
GET {{baseURL}}/planets/{id}
```

### POST - Create Planet

```bash
POST {{baseURL}}/planets
```

```json
Body:
{
  "name": "kojimaWorld",
  "diameter": 999999,
  "rotationPeriod": 43,
  "orbitalPeriod": 304,
  "gravity": [
    {
      "value": 3.4,
      "description": "standard"
    }
  ],
  "population": 66689,
  "climate": ["snowy"],
  "terrain": ["arid"],
  "waterSurfacePer": 1,
}

```

### PUT - Update Planet

```bash
PUT {{baseURL}}/planets/{id}
```

```json
Body:
{
    "name": "senku",
    "diameter": 20000,
    "rotationPeriod": 23,
    "orbitalPeriod": 304,
    "gravity": [
        {
            "value": 5,
            "description": "standard",
            "_id": "6972853e0214a9d8aeca7c17"
        }
    ],
    "population": 200000,
    "climate": [
        "arid"
    ],
    "terrain": [
        "desert"
    ],
    "waterSurfacePer": 1
}

```

### DELETE - Delete Planet

```bash
DELETE {{baseURL}}/planets/{id}
```
```json
{"Result Code " : 200}
```

# Species Endpoint

### GET - Select

```bash
GET {{baseURL}}/species/select
```

### GET - List paginated

```bash
GET {{baseURL}}/species?page=1
```

### GET - By ID

```bash
GET {{baseURL}}/species/{id}
```

### POST - Create Specie

```bash
POST {{baseURL}}/species
```

```json
Body:
{
    "name": "Tiger",
    "classification": "carnivore",
    "designation": "Fast",
    "averageHeight": 50,
    "averageLifeSpan": 20,
    "eyeColor": [
        "orange"
    ],
    "hairColor": [
        "red",
        "brown"
    ],
    "skinColor": [
        "blue"
    ],
    "language": "tibetian",
    "homeworld": "697285db0214a9d8aeca7c26"
}
```

### PUT - Update Specie

```bash
PUT {{baseURL}}/species/{id}
```

```json
Body:
{
    "name": "Tiger",
    "classification": "carnivore",
    "designation": "fastest",
    "averageHeight": 50,
    "averageLifeSpan": 20,
    "eyeColor": [
        "orange",
        "black"
    ],
    "hairColor": [
        "orange",
        "brown"
    ],
    "skinColor": [
        "fair"
    ],
    "language": "tibetian",
    "homeworld": "697285db0214a9d8aeca7c26"
}
```

### DELETE - Delete Specie

```bash
DELETE {{baseURL}}/species/{id}
```
```json
{"Result Code " : 200}
```

# Starships Endpoint

### GET - Select

```bash
GET {{baseURL}}/starships/select
```

### GET - List paginated

```bash
GET {{baseURL}}/starships?page=1
```

### GET - By ID

```bash
GET {{baseURL}}/starships/{id}
```

### POST - Create Starship

```bash
POST {{baseURL}}/starships
```

```json
Body:
{
  "name":"test 1",
  "model":"model 1",
  "starshipClass":"single",
  "size":180,
  "passangers":10,
  "maxAtmosphericSpeed":300,
  "hyperdrive":2.2,
  "MGLT":120,
  "weightCapacity":2000,
  "consumables": 140
}
```

### PUT - Update Starship

```bash
PUT {{baseURL}}/starships/{id}
```

```json
Body:
   {
        "_id": "6973d624bb237088f2eb5db3",
        "name": "the starlight la original",
        "model": "darkstar 3001",
        "starshipClass": "simple",
        "size": 180,
        "passangers": 10,
        "maxAtmosphericSpeed": 300,
        "hyperdrive": "2.5",
        "MGLT": 120,
        "weightCapacity": 2000,
        "consumables": 240
    }
```

### DELETE - Delete Starship

```bash
DELETE {{baseURL}}/starships/{id}
```
```json
{"Result Code " : 200}
```

# Vehicles Endpoint

### GET - Select

```bash
GET {{baseURL}}/vehicles/select
```

 ```json
Body:
[
    {
        "_id": "697bafe6b8901ec66fd4fa01",
        "name": "Sand Crawler"
    },
    {
        "_id": "697bafe6b8901ec66fd4fa02",
        "name": "T-16 skyhopper"
    },
    {
        "_id": "697bafe6b8901ec66fd4fa03",
        "name": "X-34 landspeeder"
    },
    {
        "_id": "697bafe6b8901ec66fd4fa04",
        "name": "TIE/LN starfighter"
    },....
]
````

### GET - List paginated

```bash
GET {{baseURL}}/vehicles?page=1
````

### GET - By ID

```bash
GET {{baseURL}}/vehicles/{id}
```

### POST - Create Vehicle

```bash
POST {{baseURL}}/vehicles
```

    ```json
      [
          {
              "_id": "697bafe6b8901ec66fd4fa01",
              "name": "Sand Crawler"
          },
          {
              "_id": "697bafe6b8901ec66fd4fa02",
              "name": "T-16 skyhopper"
          },
          {
              "_id": "697bafe6b8901ec66fd4fa03",
              "name": "X-34 landspeeder"
          },
          {
              "_id": "697bafe6b8901ec66fd4fa04",
              "name": "TIE/LN starfighter"
          },....
      ]

    ```

### PUT - Update Vehicle

```bash
PUT {{baseURL}}/vehicles/{id}
```

```json
Body:
{
  "name": "Speeder Updated",
  "model": "X-34"
}
```

### DELETE - Delete Vehicle

```bash
DELETE {{baseURL}}/vehicles/{id}
```
```json
{"Result Code " : 200}
```