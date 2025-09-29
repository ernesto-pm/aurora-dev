import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://127.0.0.1:8001/openapi.json',
    output: 'app/services/aurora-data-server',
    plugins: [
        '@hey-api/client-axios',
        '@tanstack/react-query'
    ],
});