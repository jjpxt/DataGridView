// Funções para gerenciar o modal
const inicializarModal = () => {
  const modal = document.getElementById("modalProduto");
  const btnAbrir = document.getElementById("btnAbrirModal");
  const btnFechar = document.querySelector(".fechar");
  const btnCancelar = document.querySelector(".btn-cancelar");
  const form = document.getElementById("formProduto");

  // Abrir modal
  btnAbrir.onclick = () => {
    modal.style.display = "block";
    form.reset();
  };

  // fecha o modal se clicar no X
  btnFechar.onclick = () => {
    modal.style.display = "none";
  };

  // Fechar modal ao clicar no botão Cancelar
  btnCancelar.onclick = () => {
    modal.style.display = "none";
  };

  // Fechar modal clicando fora
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  // Envio do formulário
  form.onsubmit = (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    adicionarProduto(); // Chama função para adicionar produto
    modal.style.display = "none"; // Fecha o modal
  };
};
