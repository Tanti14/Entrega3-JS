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
  <p class="animate-text">PIZZA ENCONTRADA</p>
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
    <p class="animate-text">ULTIMA PIZZA BUSCADA</p>
      <img src="${ultimoItem.imagen}" class="card-img" alt="img pizza" />
        <div class="card-info">
          <p class="pizza-name"><span>${ultimoItem.nombre}</span></p>
          <p class="pizza-price">Precio: <span>$${ultimoItem.precio}</span></p>
        </div>
    </div>`;
  }


  if(ultimoItem.id == undefined) {
    answerContainer.innerHTML = `
    <div class="card">
    <p class="animate-text">BUSCADOR DE PIZZAS</p>
        <div class="errCard-text">
          <p>Ingrese un ID para obtener una pizza.</p>
        </div>
        <img src="./img/pizza-vector.png" class="card-img" alt="img pizza" />
    </div>`;
  }
};

// =========================================================================
// Funcion que crea una Card para los errores.
const showError = (message) => {
  return (answerContainer.innerHTML = `
  <div class="errAnimation errorCard">
    <div class="errCard-text">
      <h2 class="errCard-title">¡ERROR!</h2>
      <p class="errCard-msg">${message}</p>
    </div>
    <img src="./img/error404-nopizza.jpg" class="errCard-img" alt="img pizza" />
  </div>`);
};

// =========================================================================
// Funcion para verificar si el input tiene algun valor valido o no.
const isEmpty = (input) => {
  return !input.value;
};

const checkInput = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    valid = false;
    showError(
      "Este campo no se puede omitir. Porfavor, ingrese un ID válido."
    );
    return;
  }

  valid = true;
  return valid;
};

// =========================================================================
const ejecutar = (e) => {
  e.preventDefault();

  // Guardo en una variable el valor que ingresa por el Input ya validado.
  let isValidInput = checkInput(numberInput);

  if (isValidInput) {
    // Guardo el valor del ID que viene del input en una variable
    const idIngresado = numberInput.value;
    recuperarPizza(ultimoItem)
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
      showError("No se encontro la pizza deseada. Porfavor, ingrese un ID diferente.");
    }
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", recuperarPizza);
  formContainer.addEventListener("submit", ejecutar);
};

init();
