import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@libs/contract';

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'DineEase API',
    version: '1.0.0',
  },
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      customHeaderAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token',
        description: 'Access token',
      },
    },
  },
});
