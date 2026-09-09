import { Router, type Request, type Response } from "express";
import { clienteService } from "../services/cliente.service.js"; 
import type { CriarCliente } from "../types/cliente.js"; 

export const clienteRouter = Router();


clienteRouter.get("/", async (_request: Request, response: Response) => {
    try {
        const clientes = await clienteService.getAll();
        return response.json(clientes);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return response.status(500).json({ error: "Erro interno do servidor" });
    }
});

clienteRouter.post("/", async (request: Request<object, object, CriarCliente>, response: Response) => {
    try {
        const dados = request.body;
        const cliente = await clienteService.create(dados);

      
        return response.status(201).json(cliente);
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        return response.status(500).json({ error: "Erro interno do servidor" });
    }
});