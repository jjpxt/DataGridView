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

// Funções de gerenciamento de produtos
const inicializarProdutos = () => {
  if (!localStorage.getItem("produtos")) {
    const produtosIniciais = [
      { id: 1, produto: "Notebook", marca: "Dell", modelo: "Inspiron" },
      { id: 2, produto: "Smartphone", marca: "Apple", modelo: "iPhone 12" },
    ];
    localStorage.setItem("produtos", JSON.stringify(produtosIniciais));
  }
};

const getProximoId = () => {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  return produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
};

// Adicionar Produto
const adicionarProduto = () => {
  const produto = document.getElementById("inputProduto").value;
  const marca = document.getElementById("inputMarca").value;
  const modelo = document.getElementById("inputModelo").value;

  if (produto && marca && modelo) {
    const novoProduto = {
      id: getProximoId(),
      produto,
      marca,
      modelo,
    };
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    dgv(); // Atualizar tabela
  }
};
