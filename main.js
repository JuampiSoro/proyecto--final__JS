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


// FUNCIONES

const funcionEleccionProducto = (productoElegido) => parseInt(prompt(`Ingresaste ${productoElegido}. Ingresá la cantidad que queres de este producto.`));

const descuento = (total) => total * 0.9;

const alertTotal = (total) => alert(`Tu total hasta ahora es de ${total}`);



// COMIENZO DE INTERACCIÓN CON EL USUARIO
alert("Bienvenido a Veggie!");

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

    } else {
        if (total > 0) {
            alert("Muchas gracias por confiar en nosotros.")

            // PREGUNTA SI EL USUARIO TIENE CODIGO DE DESCUENTO

            const preguntaSiTieneCodigoDescuento = prompt("Tiene codigo de descuento? Responda con un SI o un NO").toLowerCase();

            if (preguntaSiTieneCodigoDescuento == "si") {
                const ingresoCodigoDescuento = prompt("Ingresa el codigo de descuento. En la consola lo podes ver tambien").toLowerCase();

                if (ingresoCodigoDescuento == "tupromo2022") {
                    console.log("Ingresaste correctamente el codigo de descuento. ")
                    alert(`El total con el descuento del 10% incluido es de ${descuento(total)}`);
                }
            }

            alert(`El total es: $${total}`);

        } else {
            alert("No compraste nada :(")
        }
    }
}

console.log(listaDeProductosUsuario);












