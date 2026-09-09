import pg from "pg";
import "dotenv/config";

const { Pool } = pg;


export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (error: Error) => {
    console.error("Erro inesperado no banco de dados:", error);
    process.exit(1);
});