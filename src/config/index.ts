// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log(import.meta.env.VITE_BASE_URL);


export default {
    env: import.meta.env.VITE_NODE_ENV,
    port: import.meta.env.VITE_PORT,
    baseUrl: import.meta.env.VITE_BASE_URL,
};
