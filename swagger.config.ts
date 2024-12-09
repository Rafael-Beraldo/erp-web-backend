import swaggerJsdoc, { Options } from "swagger-jsdoc";
import dotenv from "dotenv";
 
dotenv.config();

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '🚚 Ciatruck - API 🚚',
            version: '1.0.0',
            description: '✅ Documentação da API Express com Swagger para facilitar entendimento na hora de manutenção. ✅',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./src/router/*.ts'],
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);