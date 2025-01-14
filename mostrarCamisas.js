import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

// Função para construir o card de cada camisa
function constroiCard(time, preco, imagem, id) {
    const camisa = document.createElement("li");
    camisa.className = "camisas__item";
    camisa.innerHTML = `
    <div class="descricao-camisas">
        <img src="${imagem}" alt="Imagem da camisa do time ${time}">
        <h3>Time: ${time}</h3>
        <p>Valor: R$ ${parseFloat(preco).toFixed(2)}</p>
        <button class="btn-excluir" data-id="${id}" aria-label="Excluir camisa do time ${time}">
            Excluir
        </button>
    </div>`;

    // Adiciona o evento de clique para excluir a camisa
    camisa.querySelector(".btn-excluir").addEventListener("click", () => {
        excluirCamisa(id, camisa);
    });

    return camisa;
}

// Função para listar camisas
async function listaCamisas() {
    try {
        const listaApi = await conectaApi.listaCamisas();
        if (!Array.isArray(listaApi)) {
            throw new Error("Os dados retornados não são uma lista válida.");
        }

        lista.innerHTML = ""; // Limpa a lista antes de carregar os itens
        listaApi.forEach((elemento) => {
            lista.appendChild(
                constroiCard(elemento.time, elemento.preco, elemento.imagem, elemento.id)
            );
        });
    } catch (erro) {
        console.error("Erro ao listar camisas:", erro);
        lista.innerHTML = `<h3 class="mensagem__titulo">Não foi possível carregar a lista de camisas. Tente novamente mais tarde.</h3>`;
    }
}

// Função para excluir camisa
async function excluirCamisa(id, camisaElement) {
    try {
        await conectaApi.excluirCamisa(id);
        lista.removeChild(camisaElement); // Remove a camisa do DOM
        alert("Camisa excluída com sucesso!");
    } catch (erro) {
        console.error("Erro ao excluir camisa:", erro);
        alert("Não foi possível excluir a camisa. Tente novamente mais tarde.");
    }
}

// Carrega a lista de camisas ao iniciar a página
listaCamisas();
