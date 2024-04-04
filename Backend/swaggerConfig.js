const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de Ejemplo',
    },
  },
  apis: ['./index.js'], // Ruta a tu archivo index.js que contiene las rutas de la API
};

const specs = swaggerJsdoc(options);

module.exports = specs;
