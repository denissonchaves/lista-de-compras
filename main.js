let itemList = [];
let itemToEdit;

const form = document.getElementById("form-itens");
const itemsInput = document.getElementById("receber-item");
const ulItems = document.getElementById("lista-de-itens");
const ulPurchasedItems = document.getElementById("itens-comprados");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveItem();
  showItem();
  itemsInput.focus();
});

function saveItem() {
  const itemToBuy = itemsInput.value;
  const checkDuplicate = itemList.some((item) => {
    return item.value.toLowerCase() === itemToBuy.toLowerCase();
  });

  if (checkDuplicate) {
    alert("Item já adicionado");
    return;
  } else if (itemToBuy === "") {
    alert("Campo vazio");
    return;
  } else {
    itemList.push({
      value: itemToBuy,
      checked: false,
    });
  }
  itemsInput.value = "";
}

function showItem() {
  ulItems.innerHTML = "";
  ulPurchasedItems.innerHTML = "";

  itemList.forEach((item, index) => {
    if (item.checked) {
      ulPurchasedItems.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" checked class="is-clickable" />
            <span class="itens-comprados is-size-5">${item.value}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    } else {
      ulItems.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${item.value}"></input>
          </div>
          <div>
            <button onclick="saveEdit()">
              <i class="fa-regular fa-floppy-disk is-clickable"></i>
            </button>
            <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    }

    const inputsCheck = document.querySelectorAll("input[type='checkbox']");

    inputsCheck.forEach((item) => {
      item.addEventListener("click", (event) => {
        const elementValue = event.target.parentElement.parentElement.getAttribute("data-value");
        itemList[elementValue].checked = event.target.checked;
        showItem();
      });
    });
  });
}

function saveEdit() {
  const editedItem = document.querySelector(`[data-value="${itemToEdit}"] input[type="text"]`);
  console.log(editedItem.value);
}
