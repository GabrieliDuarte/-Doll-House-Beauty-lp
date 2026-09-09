import express, { type Request, type Response } from "express";
import { clienteRouter } from "./routes/cliente.route.js"; 

const app = express();
const port = 3000;


app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  return response.json({
    status: "ok",
    message: "API do Salão Doll House Beauty rodando perfeitamente! ",
  });
});


app.use("/clientes", clienteRouter);

app.listen(port, () => {
  console.log(`API do Salão rodando em http://localhost:${port}`);
});