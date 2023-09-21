let listaDeItens = [];

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
});

function salvarItem() {
  const comprasItem = itensInput.value;
  const checarDuplicado = listaDeItens.some((item) => {
    return item.valor.toLowerCase() === comprasItem.toLowerCase();
  });

  if (checarDuplicado) {
    alert("Item já adicionado");
    return;
  } else if (comprasItem === "") {
    alert("Campo vazio");
    return;
  } else {
    listaDeItens.push({
      valor: comprasItem,
      checar: false,
    });
  }
  itensInput.value = "";
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";

  listaDeItens.forEach((item, index) => {
    if (item.checar) {
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${item.valor}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    } else {
      ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${item.valor}"></input>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    }

    const inputsCheck = document.querySelectorAll("input[type='checkbox']");

    inputsCheck.forEach((input) => {
      input.addEventListener("click", (event) => {
        const valorDoElemento = event.target.parentElement.parentElement.getAttribute("data-value");
        listaDeItens[valorDoElemento].checar = event.target.checked;
        mostrarItem();
      });
    });
  });
}
