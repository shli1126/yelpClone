import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'yelp',
        password: 'vb36bu*7&vd',
        port: 5432,
    })

export const db = {
        query: (text, params) => pool.query(text, params),
};
