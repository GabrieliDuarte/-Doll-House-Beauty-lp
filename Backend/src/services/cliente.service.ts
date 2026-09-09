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
}

export const clienteService = new ClienteService();