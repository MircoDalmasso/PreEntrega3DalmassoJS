let header = document.getElementById("container-header");
let containerBody = document.getElementsByClassName("container-body")[0];
let sectionProductos = document.getElementById("section-productos");
let sectionCaritto = document.getElementById("section-carrito");

const mostrarProductos = () => {
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
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
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
        let indiceEliminar = carrito.findIndex(item => item.id == id)
        if(indiceEliminar != -1){
            carrito.splice(indiceEliminar, 1);
        }
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

// filtros
let btnPriceDesendente = document.getElementById("priceDesendente");
let btnPriceAscendente = document.getElementById("priceAscendente");
let btnPerifericos = document.getElementById("perifericos");
let btnDispositivos = document.getElementById("equipos");

btnPriceDesendente.addEventListener("click", () =>{
    const porductosFiltrados = productos.sort((a, b) => b.precio - a.precio);

    sectionProductos.innerHTML = "";
    porductosFiltrados.forEach(item => {
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
});

btnPriceAscendente.addEventListener("click", () =>{
    const porductosFiltrados = productos.sort((a, b) => a.precio - b.precio);

    sectionProductos.innerHTML = "";
    porductosFiltrados.forEach(item => {
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
});

btnPerifericos.addEventListener("click", () =>{
    const porductosFiltrados = productos.filter(item => item.type === "periferico");

    sectionProductos.innerHTML = "";
    porductosFiltrados.forEach(item => {
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
});

btnDispositivos.addEventListener("click", () =>{
    const porductosFiltrados = productos.filter(item =>item.type === "dispositivo" );

    sectionProductos.innerHTML = "";
    porductosFiltrados.forEach(item => {
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
});


// Ejecucion de agregar al carrito
sectionProductos.addEventListener("click", agregarAlCarrito);

// Ejecucion de eliminar del carrito
sectionCaritto.addEventListener('click', eliminarDelCarrito);

// Ejecucion de pagar los productos
const errorCompra = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error!",
    });
};

let buttonPagar = document.getElementById("buttonPagar");

const precioTotalNumero = parseInt(totalPrice.innerText.replace("$", ""));

buttonPagar.addEventListener("click", async () => {
    try{
        const orderData = {
            title: "carrito",
            quantity: 1,
            price: 1500,
        };
    
        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData),
        });
        const preference = await response.json();
        createCheckoutButton(preference.id);
    } catch(error){
        errorCompra();
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();

        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };

    renderComponent();
};

const mp = new MercadoPago('TEST-560127d4-2e85-4872-acd2-5fb1081ed738', {
    locale: "es-AR",
});














let verificacion = localStorage.getItem("carrito") === "[]";

    const finalizarCompra = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra finalizada!",
            showConfirmButton: false,
            timer: 2000
        });
        localStorage.clear();
        sectionCaritto.innerHTML = "";
        totalPrice.innerHTML = "$0"
        setTimeout( () =>{
            location.reload();
        },3000);
    }

