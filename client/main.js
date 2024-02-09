// arreglo de productos
const productos = [
    {id: 1, nombre: "Mouse", precio: 8000, img: 'img/mouse.png', type: "periferico"}, 
    {id: 2, nombre: "Teclado", precio: 13000, img: 'img/teclado.png', type: "periferico"},
    {id: 3, nombre: "Auriculares", precio: 5000, img: 'img/auriculares.png', type: "periferico"},
    {id: 4, nombre: "Alfombrilla", precio: 1000, img: 'img/alfombrilla.png', type: "periferico"},
    {id: 5, nombre: "Webcam", precio: 9000, img: 'img/webcam.png', type: "periferico"},
    {id: 6, nombre: "Parlante", precio: 7000, img: 'img/parlante.png', type: "periferico"},
    {id: 7, nombre: "Pc Gamer", precio: 99500, img: 'img/pc-gamer.webp', type: "dispositivo"}, 
    {id: 8, nombre: "Iphone", precio: 50100, img: 'img/iphone.webp', type: "dispositivo"},
    {id: 9, nombre: "Impresora", precio: 17000, img: 'img/impresora.png', type: "dispositivo"},
    {id: 10, nombre: "Laptop", precio: 70200, img: 'img/laptop.png', type: "dispositivo"},
];

let carrito = [];
!localStorage.getItem("carrito") && localStorage.setItem("carrito", JSON.stringify([]));