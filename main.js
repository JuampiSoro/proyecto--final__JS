// MOSTRAR EN CONSOLA CODIGO DE DESCUENTO
console.log("El codigo de descuento es: TUPROMO2022");
//


// CREAMOS LA CLASE DE PRODUCTO
// class Producto {
//     constructor(nombre, categorias, precio) {
//         this.nombre = nombre;
//         this.categorias = categorias;
//         this.precio = precio;
//     }
// }

// DECLARAMOS TOTAL DE PRECIO
let total = 0;



// ARRAY CON PRODUCTOS

// const productos = [
//     {
//         nombre: "Castañas de Cajú",
//         precio: 400,
//     },
//     {
//         nombre: "Leche de Cacahuate",
//         precio: 270
//     },
//     {
//         nombre: "Maní tostado salado",
//         precio: 100,
//     },
//     {
//         nombre: "Maní Japonés Natural",
//         precio: 200,
//     }

// ]






// DECLARAMOS LOS ELEMENTOS

// ELEMENTO LISTA DE PRODUCTOS - PARA RENDERIZAR PRODUCTOS

const listaProductos = document.querySelector(".main__lista__productos");


// ELEMENTOS CÓDIGO DE DESCUENTO
const inputCodigo = document.querySelector("#main__codigo__input");
const btnCodigoSend = document.querySelector("#main__codigo__send");
const seccionIngresarCodigo = document.querySelector("#main__div__ingreso__codigo")
const cartelCodigoAplicado = document.querySelector("#main__codigo__aplicado");

// CODIGO DE DESCUENTO EN LOCAL STORAGE

const consultaLocalCodigo = localStorage.getItem("CodigoDescuento");
const jsonLocalCodigo = JSON.parse(consultaLocalCodigo);



// FUNCIONES

// FUNCION PARA RENDER DE CADA PRODUCTO
const renderEachProducto = (numeroImagen, nombre, precio) => {

    const cardProducto = document.createElement("div");
    cardProducto.classList.add("main__producto");

    cardProducto.innerHTML = `<img src="imgs/${numeroImagen}.jpeg" alt="${nombre}" class="main__producto__img">
        <h4 class="main__producto__title">${nombre}</h4>
        <p class="main__producto__precio">${precio}$</p>
        <button class="main__producto__btn"><span class="main__producto__btn__plus">+</span></button>`

    listaProductos.append(cardProducto);
}



// FUNCION PARA PEDIR PRODUCTOS CON JSON Y RENDER DE CADA PRODUCTO
const pedirProductos = async () => {
    const resp = await fetch("productos.json");
    const data = await resp.json();

    data.forEach((producto) => {
        renderEachProducto(producto.numeroImagen, producto.nombre, producto.precio)
    });
}


const funcionEleccionProducto = (productoElegido) => parseInt(prompt(`Ingresaste ${productoElegido}. Ingresá la cantidad que queres de este producto.`));

const descuento = (total) => total * 0.9;

const alertTotal = (total) => alert(`Tu total hasta ahora es de ${total}`);

const notificacionCodigo = (texto, bgColor) => {
    Toastify({
        text: texto,
        gravity: "top",
        position: "right",
        duration: 3000,
        style: {
            background: bgColor,
        }
    }).showToast();
}


// COMIENZO DE INTERACCIÓN CON EL USUARIO

pedirProductos();

let ingresoPrimerProducto = "";

while (ingresoPrimerProducto !== "salir") {
    ingresoPrimerProducto = prompt("Productos disponibles en stock: Leche de Cacahuate - Castañas de Cajú - Barra de Coco. Ingresá tu producto de preferencia. Si no queres agregar mas productos ingresa la palabra SALIR").toLowerCase();



    if (ingresoPrimerProducto == "leche de cacahuate") {
        let cantidad = funcionEleccionProducto(lecheDeCacahuate.nombre);
        total += cantidad * lecheDeCacahuate.precio;
        alertTotal(total);


    } else if (ingresoPrimerProducto == "castañas de caju" || ingresoPrimerProducto == "castañas de cajú") {
        let cantidad = funcionEleccionProducto(castaniasDeCaju.nombre);
        total += cantidad * castaniasDeCaju.precio;
        alertTotal(total);


    } else if (ingresoPrimerProducto == "barra de coco") {
        let cantidad = funcionEleccionProducto(barraCoco.nombre);
        total += cantidad * barraCoco.precio;
        alertTotal(total);


    }
}


// CODIGO DE DESCUENTO


if (jsonLocalCodigo == true) {
    seccionIngresarCodigo.remove();
    cartelCodigoAplicado.style.display = "block";
}

btnCodigoSend.addEventListener("click", () => {
    let inputValue = inputCodigo.value.toLowerCase();

    inputValue !== "tupromo2022" && notificacionCodigo("No existe este código.", "red");

    if (inputValue == "tupromo2022") {
        seccionIngresarCodigo.remove();
        notificacionCodigo("Código aceptado!", "#94B49F");
        cartelCodigoAplicado.style.display = "block";
        localStorage.setItem("CodigoDescuento", true);
    }

    inputCodigo.value = "";


})




