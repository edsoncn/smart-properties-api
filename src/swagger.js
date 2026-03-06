const swaggerAutogen = require('swagger-autogen')()


const doc = {
    "swagger": "2.0",
    "info": {
        "version": "0.0.1",
        "title": "Smart Properties API documentation",
        "description": "Smart Properties REST API documentation"
    },
    "host": "localhost:3001",
    "basePath": "/",
    "tags": [
        {
            "name": "Smart Properties",
            "description": "Smart Properties service methods to manage properties attributes"
        },
        {
            "name": "Smart Properties Code",
            "description": "Smart Properties Code service methods to get properties code"
        },
        {
            "name": "Smart Properties Keys",
            "description": "Smart Properties Keys service methods to get properties keys"
        }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
}

const outputFile = './src/swagger.json'
const endpointsFiles = [
        './src/app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')           // Your project's root file
})