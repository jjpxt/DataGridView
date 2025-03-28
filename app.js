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
    e.preventDefault();
    adicionarProduto();
    modal.style.display = "none";
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

    dgv();
  }
};

// Função de renderização
const dgv = (configdgv = { idDestino: "dgvDados" }) => {
  inicializarProdutos();
  const dgvDados = document.getElementById(configdgv.idDestino);
  dgvDados.innerHTML = "";

  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.forEach((el) => {
    const dgvLinha = document.createElement("div");
    dgvLinha.setAttribute("class", "dgvLinha");

    const c1 = document.createElement("div");
    c1.setAttribute("class", "coluna c1");
    c1.innerHTML = el.id;
    dgvLinha.appendChild(c1);

    const c2 = document.createElement("div");
    c2.setAttribute("class", "coluna c2");
    c2.innerHTML = el.produto;
    dgvLinha.appendChild(c2);

    const c3 = document.createElement("div");
    c3.setAttribute("class", "coluna c3");
    c3.innerHTML = el.marca;
    dgvLinha.appendChild(c3);

    const c4 = document.createElement("div");
    c4.setAttribute("class", "coluna c4");
    c4.innerHTML = el.modelo;
    dgvLinha.appendChild(c4);

    const c5 = document.createElement("div");
    c5.setAttribute("class", "coluna c5");
    dgvLinha.appendChild(c5);

    const imgDelete = document.createElement("img");
    imgDelete.setAttribute("class", "dgvIcone");
    imgDelete.setAttribute("src", "images/lixeira.svg");
    imgDelete.addEventListener("click", () => excluirProduto(el.id));
    c5.appendChild(imgDelete);

    const imgEditar = document.createElement("img");
    imgEditar.setAttribute("class", "dgvIcone");
    imgEditar.setAttribute("src", "images/editar.svg");
    imgEditar.addEventListener("click", () => editarProduto(el));
    c5.appendChild(imgEditar);

    const imgExibir = document.createElement("img");
    imgExibir.setAttribute("class", "dgvIcone");
    imgExibir.setAttribute("src", "images/visualizar.svg");
    imgExibir.addEventListener("click", () => visualizarProduto(el));
    c5.appendChild(imgExibir);

    dgvDados.appendChild(dgvLinha);
  });
};

// Funções de exclusão, edição e visualização
const excluirProduto = (id) => {
  const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
  if (confirmacao) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter((p) => p.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    dgv();
  }
};

const editarProduto = (produto) => {
  const novoProduto = prompt("Digite o novo nome do produto:", produto.produto);
  const novaMarca = prompt("Digite a nova marca:", produto.marca);
  const novoModelo = prompt("Digite o novo modelo:", produto.modelo);

  if (novoProduto && novaMarca && novoModelo) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const index = produtos.findIndex((p) => p.id === produto.id);

    if (index !== -1) {
      produtos[index] = {
        ...produtos[index],
        produto: novoProduto,
        marca: novaMarca,
        modelo: novoModelo,
      };

      localStorage.setItem("produtos", JSON.stringify(produtos));
      dgv();
    }
  }
};

const visualizarProduto = (produto) => {
  alert(`
    Detalhes do Produto
    ID: ${produto.id}
    Produto: ${produto.produto}
    Marca: ${produto.marca}
    Modelo: ${produto.modelo}
  `);
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  inicializarProdutos();
  inicializarModal();
  dgv();
});

// Exportar funções
export {
  dgv,
  adicionarProduto,
  excluirProduto,
  editarProduto,
  visualizarProduto,
};
