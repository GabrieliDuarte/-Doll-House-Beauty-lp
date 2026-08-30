import express, { type Request, type Response } from "express";
import { randomUUID } from "node:crypto";

const app = express();
const port = 3000;

app.use(express.json());

// Rota de Health Check
app.get("/health", (_request: Request, response: Response) => {
  return response.json({
    status: "ok",
    message: "API do Salão Doll House Beauty rodando perfeitamente! 💅✨",
  });
});

interface CreateClienteBody {
  nome: string;
  telefone: string;
}

// Rota para cadastrar cliente
app.post("/clientes", (
  request: Request<object, object, CreateClienteBody>,
  response: Response
) => {
  const nome = request.body.nome?.trim();
  const telefone = request.body.telefone?.trim();

  if (!nome || !telefone) {
    return response.status(400).json({
      error: "Nome e telefone são obrigatórios para cadastrar um cliente.",
    });
  }

  return response.status(201).json({
    id: randomUUID(),
    nome,
    telefone,
    mensagem: "Cliente cadastrado com sucesso no salão!"
  });
});

app.listen(port, () => {
  console.log(`🚀 API do Salão rodando em http://localhost:${port}`);
});