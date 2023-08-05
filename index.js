const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const formContainer = document.getElementById("form-container");
const numberInput = document.getElementById("numberInput");
const answerContainer = document.getElementById("answerContainer");

const ultimoItem = JSON.parse(localStorage.getItem("ultimoItem")) || [];

// Función para guardar los usuarios en el localStorage

const saveToLocalStorage = (last) => {
  localStorage.setItem("ultimoItem", JSON.stringify(last));
};

// Recibo el id desde el input como parametro
const buscarID = (id) => {
  return pizzas.find((pizza) => pizza.id == id);
};

const createCard = (pizza) => {
  answerContainer.innerHTML = `
  <div class="card">
  <p class="animate-charcter">PIZZA ENCONTRADA</p>
    <img src="${pizza.imagen}" class="card-img" alt="img pizza" />
      <div class="card-info">
        <p class="pizza-name"><span>${pizza.nombre}</span></p>
        <p class="pizza-price">Precio: <span>$${pizza.precio}</span></p>
      </div>
  </div>`;
};

const recuperarPizza = () => {
  if (ultimoItem) {
    answerContainer.innerHTML = `
    <div class="card">
    <p class="animate-charcter">ULTIMA PIZZA BUSCADA</p>
    
      <img src="${ultimoItem.imagen}" class="card-img" alt="img pizza" />
        <div class="card-info">
          <p class="pizza-name"><span>${ultimoItem.nombre}</span></p>
          <p class="pizza-price">Precio: <span>$${ultimoItem.precio}</span></p>
        </div>
    </div>`;
  }
};

// =========================================================================

const showError = (message) => {
  return (answerContainer.innerHTML = `
  <div class="errAnimation errorCard">
    <p class="showErr">¡ERROR!</p>
    <p class="showErr">${message}</p>
    <img src="./img/error404-nopizza.jpg" class="errorCard-img" alt="img pizza" /> 
    
  </div>`);
};

// =========================================================================

const verificacion = (input) => {
  return !input.value;
};

// =========================================================================
const checkInput = (input) => {
  let valid = false;

  if (verificacion(input)) {
    showError(
      "No se admiten letras ni simbolos. Porfavor, ingrese un ID númerico."
    );
    return;
  }

  valid = true;
  return valid;
};

// =========================================================================

const ejecutar = (e) => {
  e.preventDefault();

  let isValidInput = checkInput(numberInput);

  if (isValidInput) {
    // Guardo el valor del ID que viene del input en una variable
    const idIngresado = numberInput.value;

    // buscarID() devuelve el primer elemento que encuentre que cumpla la condicion.
    // Guardo ese elemento en la variable pizzaEncontrada.
    let pizzaEncontrada = buscarID(idIngresado);

    // Pregunto: SI pizzaEncontrada existe...
    if (pizzaEncontrada) {
      // Ejecuta esto
      recuperarPizza(ultimoItem);
      createCard(pizzaEncontrada);
      saveToLocalStorage(pizzaEncontrada);
    } else {
      showError("No se encontro una pizza para mostrar");
    }
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", recuperarPizza);
  formContainer.addEventListener("submit", ejecutar);
};

init();
