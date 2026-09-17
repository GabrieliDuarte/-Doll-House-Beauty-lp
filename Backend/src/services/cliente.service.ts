import { pool } from "../database/connection";
import type { Cliente, CriarCliente } from "../types/cliente.ts";

class ClienteService {
    // Busca todas as clientes do salão
    async getAll(): Promise<Cliente[]> {
        try {
            const res = await pool.query<Cliente>("SELECT * FROM clientes");
            return res.rows;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    // Cadastra uma nova cliente
    async create(dados: CriarCliente): Promise<Cliente> {
        const res = await pool.query<Cliente>(
            `INSERT INTO clientes (nome, telefone, idade, email) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [dados.nome, dados.telefone, dados.idade, dados.email]
        );
        const cliente = res.rows[0];

        if (!cliente) {
            throw new Error("Cliente não retornado");
        }
        return cliente;
    }

    // Busca uma cliente específica pelo ID
    async getById(id: string): Promise<Cliente> {
        try {
            const res = await pool.query<Cliente>("SELECT * FROM clientes WHERE id = $1", [id]);
            
            if (res.rows.length === 0) {
                throw new Error("CLIENTE_NAO_ENCONTRADO");
            }
            
            return res.rows[0];
        } catch (error: any) {
            if (error.message === "CLIENTE_NAO_ENCONTRADO") throw error;
            console.error("Erro ao buscar cliente por ID:", error);
            throw new Error("Erro no banco de dados");
        }
    }
}

export const clienteService = new ClienteService();