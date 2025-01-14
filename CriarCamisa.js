import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarCamisa(evento) {
  evento.preventDefault();

  const time = document.querySelector("[data-time]").value.trim();
  const preco = document.querySelector("[data-preco]").value.trim();
  const imagem = document.querySelector("[data-imagem]").value.trim();

  // Validação de entradas
  if (!time || !preco || !imagem) {
    alert("Todos os campos devem ser preenchidos!");
    return;
  }

  try {
    await conectaApi.criarCamisa(time, preco, imagem);
    alert("Camisa criada com sucesso!");

    // Limpar formulário após envio bem-sucedido
    formulario.reset();
  } catch (erro) {
    console.error(erro);
    alert("Não foi possível criar a camisa. Tente novamente mais tarde.");
  }
}

formulario.addEventListener("submit", criarCamisa);
