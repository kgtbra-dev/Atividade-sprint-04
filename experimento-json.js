// Exercício 1.1 
let historicoMensagens  = [
  { id: 1, usuario: "Ana", texto: "Bom dia, turma!" },
  { id: 2, usuario: "Pedro", texto: "Servidor online!" }
]

//Atribuindo os dados anteriores a essa variável e transformando em uma string de JSON
const conteudoSalvar = JSON.stringify(historicoMensagens, null, 2);

//Mostrando a variável conteudoSalvar
console.log(conteudoSalvar);

//Mostrando o tipo JSON da variável conteudoSalvar
console.log("Tipo da variável:", typeof conteudoSalvar);


//==========================================================//

// Exercício 1.1 
const jsonValido = '[{"id": 10, "usuario": "Lucas", "texto": "Teste"}]';

//transformando a string em um objeto JSON
JSON.parse(jsonValido)

const jsonQuebrado = '[{ id: 10, quebrado: sim ';

try {
    JSON.parse(jsonQuebrado)
} catch (erro) {
    console.error("Alerta: JSON corrompido! Detalhes:", erro.message);
}
