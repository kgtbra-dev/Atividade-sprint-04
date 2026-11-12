import express from 'express'

const app = express()
const PORT = 3000

//GET- página inicial
app.get('/',(req, res) => {
    res.send('Bem-vindo à Central de informações da escola!');
});

//GET - Estado do servidor
app.get('/status', (req, res) => {
 res.json({ status: "online", mensagem: "Servidor rodando com sucesso." });
});

// GET escola — Informações da instituição
app.get('/escola', (req, res) => {
    res.json([{
        nome: "Escola Técnica de Tecnologia",
        cidade: "São Paulo",
        tipo: "Ensino Técnico"
    }]);
});

// GET cursos — Cursos disponíveis 
app.get('/cursos', (req, res) => {
    res.json([
        { id: 1, nome: "Desenvolvimento de Sistemas" },
        { id: 2, nome: "Redes de Computadores" },
        { id: 3, nome: "Administração" }
    ]);
});

// GET professor — Informações do professor 
app.get('/professor', (req, res) => {
    res.json({
        nome: "Carlos Silva",
        disciplina: "Programação Back-End"
    });
});

// GET ajuda — Orientações 
app.get('/ajuda', (req, res) => {
    const orientacoes = `
    Rotas disponíveis no sistema:
    - GET /         : Página inicial com mensagem de boas-vindas.
    - GET /status   : Verifica se o servidor está online.
    - GET /escola   : Retorna dados da instituição (Nome, Cidade, Tipo).
    - GET /cursos   : Lista os cursos técnicos disponíveis.
    - GET /professor: Mostra o nome do professor e sua respectiva disciplina.
    - GET /ajuda     : Apresenta esta lista de orientações.
    `;
    res.send(orientacoes);
});
//DESAFIO EXTRA
app.get('/requisicao', (req, res) => {
  res.json({
    metodo: req.method,
    caminho: req.path,
    mensagem: "Solicitação recebida com sucesso!"
  });
});

const mensagens = [
  { id: 1, usuario: "Ana", texto: "Bom dia!" },
  { id: 2, usuario: "Pedro", texto: "Olá!" },
  { id: 3, usuario: "Maria", texto: "Tudo bem?" },
  { id: 4, usuario: "Lucas", texto: "Como vai?" },
  { id: 5, usuario: "Carla", texto: "Até logo!" }
];

function listarMensagens() { return mensagens; }

app.get("/", (req, res) => res.send("Servidor rodando! "));
//app.get("/status", (req, res) => res.json({ status: "online", sprint: 2 }));
app.get("/sobre", (req, res) => res.send("Projeto Mensageiro Local"));
app.get("/mensagens", (req, res) => res.json(listarMensagens()));
app.get("/mensagens/:id", (req, res) => {
  const mensagem = mensagens.find(m => m.id === Number(req.params.id));
  if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
  res.json(mensagem);
});
app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));

function consultar(falhar = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            falhar
            ? reject(new Error('Falhou')) // Verifica com o (?) se a situação é TRUE
            : resolve(mensagens);  // Verifica com o (:) "Caso contrario" = FALSE
        }, 1000);
    });
}

//(.then)
// .then recebe a informação que saiu do estado de pendente e é resolvida com sucesso, registrando ela em uma função callback, que será executada estritamente apos a conclusão com sucesso.
consultar().then(dados => console.log(dados));


//(.catch) 
//.catch captura o erro, recebendo essa informação e transformando ela em uma mensagem para ser informada.
consultar().catch(erro => console.log(erro.message));

app.get("/mensagens-then", (req, res ) => {
    consultar()
    .then(lista => res.json(lista))
    .catch(() => res.status(500).json({erro: "Falha na consulta."}));
});

//Sintaxe Básica de async
async function CarregarDdos() {
    return "Dados prontos";
}

//Quando precisamos pausar a execução do asnc, usamos o (await) que força a execução á esperar o asnc.
//O (await) só pode ser usado dentro de funções declaradas como asnc.
const mensagns = await consultar();


//Capturando Falhas Arguardadas com try/catch
//Garante a prevenção do colapso da aplicação, evitando que erros não tratados derrubem a instância do servidor EXPRESS em produção.
try {
    const dados = await consultar();
} catch (error) {
    console.erro(erro.message);
}

//GET/-mensagens-async 
app.get("/mensagens-async", async (req, res) =>{
try {
res.json(await consultar());
} catch (erro) {
res.status(500).json({
erro: "Falha na consulta"
});
}
});

//GET/-mensagens-erro 
app.get("/mensagens-erro", async (req, res) => {
try {
res.json(await consultar(true));
} catch (erro) {
res.status(500).json({
erro: "Falha simulada"
});
}
});

