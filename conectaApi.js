async function listaCamisas() {
  try {
    const conexao = await fetch("http://localhost:3001/Camisas");
    if (!conexao.ok) {
      throw new Error("Não foi possível obter a lista de camisas.");
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
  } catch (erro) {
    console.error(erro.message);
    throw erro; // Repassa o erro para tratamento posterior
  }
}

async function criarCamisa(time, preco, imagem) {
  try {
    const conexao = await fetch("http://localhost:3001/Camisas", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        time: time,
        preco: preco,
        imagem: imagem,
      }),
    });

    if (!conexao.ok) {
      throw new Error("Não foi possível criar a camisa.");
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
  } catch (erro) {
    console.error(erro.message);
    throw erro;
  }
}

// Função para excluir camisa
async function excluirCamisa(id) {
  try {
    const conexao = await fetch(`http://localhost:3001/Camisas/${id}`, {
      method: "DELETE",
    });

    if (!conexao.ok) {
      throw new Error("Não foi possível excluir a camisa.");
    }
  } catch (erro) {
    console.error(erro.message);
    throw erro;
  }
}

// Adicionar funções ao objeto exportado
export const conectaApi = {
  listaCamisas,
  criarCamisa,
  excluirCamisa,
};
