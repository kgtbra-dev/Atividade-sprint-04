//Exercício 2.1
import { mkdir, writeFile, readFile } from "node:fs/promises";

async function salvarHistorico() {
    const lista = [
        {id: 1, texto: "Teste 1"},
        {id: 2, texto: "Teste 2"},
    ];
    
    await mkdir(new URL('./data/', import.meta.url), { recursive: true });


    const caminhoArquivo = new URL('./data/mensagens-teste.json', import.meta.url);
    await writeFile(caminhoArquivo, JSON.stringify(lista, null, 2), "utf8");

};
await salvarHistorico()

//==========================================================//
//Exercício 2.2

async function lerDadosSeguros(nomeArquivo) {
    try {
        await readFile(nomeArquivo, "utf8");
        return JSON.parse(conteudo);
    } catch (erro) {
        if (erro.code === "ENOENT") {
            return [];
        } else {
            throw erro; 
        }
    }
};

const dados = await lerDadosSeguros(new URL("./data/arquivo-fantasma.json", import.meta.url));
console.log("Resultado com arquivo ausente:", dados);