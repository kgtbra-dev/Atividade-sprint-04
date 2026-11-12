import express from 'express';

import { LerMensagens, SalvarMensagens} from "./story.js";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Servidor rodando!"));
app.get("/status", (req, res) => res.json({status: "Online", sprint: 4}));
app.get("/sobre", (req, res) => res.send("Mensageiro Local Com Node.js, Express e ES Modules."))

app.get("/mensagens", async (req, res) => {
    try {
         res.json(await LerMensagens());
        }
     catch (error) {
        console.error(erro);
        res.status(500).json({ erro: "Não foi possivel ler as mensagens."});
    }
});

app.get("/mensagens/:id", async (req, res) => {
    try {
        const lista = await LerMensagens();
        const mensagem = lista.find(m => m.id === Number(req.params.id));
        if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada."});
        res.json(mensagem);
    } catch (error) {
        console.error(erro);
        res.status(500).json({ erro: "Falha na contagem."});
    }
});

app.get("/total-mensagens", async (req, res) => {
  try { res.json({ total: (await lerMensagens()).length }); }
  catch (erro) { res.status(500).json({ erro: "Falha na contagem." }); }
});

app.get("/exemplo-salvar", async (req, res) => {
  try {
    throw new Error("Falha planejada na gravação.");
  } catch (erro) {
    console.error("Erro planejado em /exemplo-salvar:", erro.message);
    res.status(500).json({
      erro: "Erro planejado em /exemplo-salvar",
      detalhes: erro.message,
      dica: "Use /gravar-mensagem-correta para gravar uma mensagem."
    });
  }
});

let filaGravacoes = Promise.resolve();
app.get("/gravar-mensagem-correta", (req, res) => {
  const tarefa = filaGravacoes.then(async () => {
    const lista = await lerMensagens();
    const id = lista.reduce((maior, mensagem) => Math.max(maior, Number(mensagem.id) || 0), 0) + 1;
    const mensagem = { id, usuario: "Exemplo", texto: "Gravado em arquivo!" };
    await salvarMensagens([...lista, mensagem]);
    return { aviso: "Mensagem gravada com sucesso!", mensagem, total: lista.length + 1 };
  });
  filaGravacoes = tarefa.catch(() => {});
  tarefa.then(resultado => res.json(resultado)).catch(erro => {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao gravar arquivo." });
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});