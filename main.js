// MOSTRAR EN CONSOLA CODIGO DE DESCUENTO
console.log("El codigo de descuento es: TUPROMO2022");
//


// CREAMOS LA CLASE DE PRODUCTO
class Producto {
    constructor(nombre, categorias, precio) {
        this.nombre = nombre;
        this.categorias = categorias;
        this.precio = precio;
    }
}

// DECLARAMOS TOTAL DE PRECIO
let total = 0;

// DECLARAMOS LA LISTA DE PRODUCTOS QUE QUIERE COMPRAR EL USUARIO
const listaDeProductosUsuario = [];



// DECLARAMOS LOS PRODUCTOS
const lecheDeCacahuate = new Producto("Leche de Cacahuate", ["Bebida", "Libre de TACC", "Orgánico"], 270);
const castaniasDeCaju = new Producto("Castañas de Cajú", ["Comestible", "Libre de TACC", "Envasadas"], 400);
const barraCoco = new Producto("Barra de coco", ["Comestible", "Azúcar", "Coco"], 100);


// ARRAY CON PRODUCTOS

const productos = [
    {
        nombre: "Leche de Cacahuate",
        precio: 270
    },
    {
        nombre: "Castañas de Cajú",
        precio: 400,
    },
    {
        nombre: "Barra de coco",
        precio: 100,
    }

]

// DECLARAMOS LOS ELEMENTOS


// ELEMENTOS CÓDIGO DE DESCUENTO
const inputCodigo = document.querySelector("#main__codigo__input");
const btnCodigoSend = document.querySelector("#main__codigo__send");
const seccionIngresarCodigo = document.querySelector("#main__div__ingreso__codigo")
const cartelCodigoAplicado = document.querySelector("#main__codigo__aplicado");

// CODIGO DE DESCUENTO EN LOCAL STORAGE

const consultaLocalCodigo = localStorage.getItem("CodigoDescuento");
const jsonLocalCodigo = JSON.parse(consultaLocalCodigo);



// FUNCIONES

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
let ingresoPrimerProducto = "";

while (ingresoPrimerProducto !== "salir") {
    ingresoPrimerProducto = prompt("Productos disponibles en stock: Leche de Cacahuate - Castañas de Cajú - Barra de Coco. Ingresá tu producto de preferencia. Si no queres agregar mas productos ingresa la palabra SALIR").toLowerCase();



    if (ingresoPrimerProducto == "leche de cacahuate") {
        let cantidad = funcionEleccionProducto(lecheDeCacahuate.nombre);
        total += cantidad * lecheDeCacahuate.precio;
        alertTotal(total);
        listaDeProductosUsuario.push([lecheDeCacahuate.nombre, cantidad]);

    } else if (ingresoPrimerProducto == "castañas de caju" || ingresoPrimerProducto == "castañas de cajú") {
        let cantidad = funcionEleccionProducto(castaniasDeCaju.nombre);
        total += cantidad * castaniasDeCaju.precio;
        alertTotal(total);
        listaDeProductosUsuario.push([castaniasDeCaju.nombre, cantidad]);

    } else if (ingresoPrimerProducto == "barra de coco") {
        let cantidad = funcionEleccionProducto(barraCoco.nombre);
        total += cantidad * barraCoco.precio;
        alertTotal(total);
        listaDeProductosUsuario.push([barraCoco.nombre, cantidad]);

    }
}

console.log(listaDeProductosUsuario);


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




