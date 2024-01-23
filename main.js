// arreglo de productos
const productos = [
    {id: 1, nombre: "Mouse", precio: 8000, img: 'img/mouse.png'}, 
    {id: 2, nombre: "Teclado", precio: 13000, img: 'img/teclado.png'},
    {id: 3, nombre: "Auriculares", precio: 5000, img: 'img/auriculares.png'},
    {id: 4, nombre: "Alfombrilla", precio: 1000, img: 'img/alfombrilla.png'},
    {id: 5, nombre: "Webcam", precio: 9000, img: 'img/webcam.png'},
    {id: 6, nombre: "Parlante", precio: 7000, img: 'img/parlante.png'}
];

let carrito = [];

let containerBody = document.getElementsByClassName("container-body")[0];
let sectionProductos = document.getElementById("section-productos");
let sectionCaritto = document.getElementById("section-carrito");

productos.forEach(item => {
    let div = document.createElement("div");
    div.classList.add('cards');
    div.innerHTML = `
    <img id="img" src="${item.img}"/>
    <h3>${item.nombre}</h3>
    <h2>$${item.precio}</h2>
    <button class="agregar" id="${item.id}">Comprar</button>
    `
    sectionProductos.appendChild(div);
})

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
    precioTotal();
});

const carritoLocalstorage = e => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const mostrarCarrito = () => {
    sectionCaritto.innerHTML = "";
    carrito.forEach(item => {
        let div = document.createElement("div");
        div.classList.add('cardsCarrito');
        div.innerHTML = `
        <h2 class="nombreC">${item.nombre}</h2>
        <p class="precioC">$${item.precio}</p>
        <button class="material-symbols-outlined eliminar" id="${item.id}">delete</button>
        `
        sectionCaritto.appendChild(div);
    });
    //Sincronizacion con el LocalStorage
    carritoLocalstorage();
}

const agregarAlCarrito = e => {
    if(e.target.classList.contains(`agregar`)){
        const id = e.target.id;
        const productoElejido = productos.find(item => item.id == id);
        carrito.push(productoElejido);
        mostrarCarrito();
        precioTotal();
    }
}

const eliminarDelCarrito = (e) => {
    if(e.target.classList.contains('eliminar')){
        const id = e.target.id;
        carrito = carrito.filter(item => item.id != id);
        mostrarCarrito();
        precioTotal()
    }
}

let totalPrice = document.getElementById("precioTotal");

const precioTotal = () => {
    let total = 0;
    carrito.forEach(item => {
        let precioProducto = item.precio;
        total += precioProducto;
    });
    totalPrice.innerText = `$${total}`;
}

let buttonPagar = document.getElementById("buttonPagar");

function procedimientoPagar() {
    let total = 0;
    carrito.forEach(item => {
        let precioProducto = item.precio;
        total += precioProducto;
    });

    containerBody.innerHTML = '';
    let containerPagar = document.createElement("div");
    let detalle = document.getElementsByClassName("cardsCarrito");
        containerPagar.classList.add('cardPagar');
        containerPagar.innerHTML = `
        <span class="material-symbols-outlined tarjeta">payments</span>
        <h2 id="precioPagar">Total: $${total}</h2>
        <form>
            <label for="numero">Ingrese el número de la tarjeta:</label>
            <input type="number" id="numero" name="numero" required>
            <label for="nombre">Ingrese su nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="numero">Ingrese la clave de la tarjeta:</label>
            <input type="number" id="numero" name="numero" required>
            <button type="submit" id="pagoF">Finalizar pago</button>
        </form>
        `
        containerBody.appendChild(containerPagar);
}

// Ejecucion de agregar al carrito
sectionProductos.addEventListener("click", agregarAlCarrito);

// Ejecucion de eliminar del carrito
sectionCaritto.addEventListener('click', eliminarDelCarrito);

// Ejecucion de pagar los productos
buttonPagar.addEventListener("click", procedimientoPagar);

