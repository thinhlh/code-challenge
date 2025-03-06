import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code challenge Backend application',
      version: '1.0.0',
      contact: {
        name: 'Jamie',
        email: 'thinhlh0812@gmail.com',
        url: 'www.thinhlh.com',
      },
    },
  },
  apis: ['./**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
