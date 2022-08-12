// MOSTRAR EN CONSOLA CODIGO DE DESCUENTO
console.log("El codigo de descuento es: TUPROMO2022");
//


// DECLARAMOS TOTAL DE PRECIO
let total = 0;

// DECLARAMOS CARRITO 
let carrito = [];



// DECLARAMOS LOS ELEMENTOS

// BOTON DE NAVEGACION MOBILE

const nav = document.querySelector("#nav");
const btnNav = document.querySelector("#nav__ham");
const ulNav = document.querySelector("#nav--ul");

// ELEMENTO LISTA DE PRODUCTOS - PARA RENDERIZAR PRODUCTOS

const listaProductos = document.querySelector(".main__lista__productos");


// DIV CARRITO

const divCarrito = document.querySelector("#main__carrito");

// TEXTO CARRITO VACIO
const textoCarritoVacio = document.querySelector("#main__carrito__p");



// ELEMENTOS CÓDIGO DE DESCUENTO
const inputCodigo = document.querySelector("#main__codigo__input");
const btnCodigoSend = document.querySelector("#main__codigo__send");
const seccionIngresarCodigo = document.querySelector("#main__div__ingreso__codigo")
const cartelCodigoAplicado = document.querySelector("#main__codigo__aplicado");

// BOOL CODIGO DE DESCUENTO PARA APLICAR DESCUENTO SI EL USUARIO INGRESA EL CODIGO DESPUES DE CARGAR EL CARRITO

let boolDescuento = false;

// ELEMENTO PRECIO TOTAL
const totalPrice = document.querySelector(".main__total__price");


// CODIGO DE DESCUENTO EN LOCAL STORAGE

const consultaLocalCodigo = localStorage.getItem("CodigoDescuento");
const jsonLocalCodigo = JSON.parse(consultaLocalCodigo);



// FUNCIONES

// FUNCION PARA RENDER DE CADA PRODUCTO
const renderEachProducto = (numeroImagen, nombre, precio, cantidad) => {

    const cardProducto = document.createElement("div");
    cardProducto.classList.add("main__producto");

    cardProducto.innerHTML = `<img src="imgs/${numeroImagen}.jpeg" alt="${nombre}" class="main__producto__img">
        <h4 class="main__producto__title">${nombre}</h4>
        <p class="main__producto__precio">${precio}$</p>`

    const btnEachProduct = document.createElement("button");
    btnEachProduct.classList.add("main__producto__btn");
    btnEachProduct.innerHTML = `<span class="main__producto__btn__plus">+</span></button>`;

    cardProducto.append(btnEachProduct);

    listaProductos.append(cardProducto);

    // const btnAgregarProductoCarrito = document.querySelector(".main__producto__btn");


    // CADA BOTON PARA SUMAR AL CARRITO EL PRODUCTO

    btnEachProduct.addEventListener("click", function (e) {
        const target = e.target.parentElement;
        // console.log(target);

        if (jsonLocalCodigo == true) {
            total += precio * 0.9;
            totalPrice.innerHTML = `${total}`;
        } else {
            total += precio;
            totalPrice.innerHTML = `${total}`;
        }

        // total += precio;

        const itemAgregado = nombre;


        if (carrito.includes(nombre)) {
            console.log("Juju");


        } else {
            carrito.push(itemAgregado);

            const divEachCarrito = document.createElement("div");
            divEachCarrito.classList.add("main__carrito__producto")

            divEachCarrito.innerHTML = `<img src="imgs/${numeroImagen}.jpeg" alt="${nombre}" class="main__carrito__producto__img">
            <div class="main__carrito__producto__container__title">
                <h3 class="main__carrito__producto__title" id="main__carrito__producto__title">${nombre}</h3>
                <p>${precio}$</p>

            </div>`


            const containerCantidad = document.createElement("div");
            containerCantidad.classList.add("main__carrito__producto__container__cantidad");
            containerCantidad.innerHTML = `<p class="main__carrito__producto__cantidad">Cantidad</p>`;
            divEachCarrito.append(containerCantidad);

            const pCantidad = document.createElement("p");
            pCantidad.innerText = `${cantidad}`;
            containerCantidad.append(pCantidad);

            let innerPCantidad = pCantidad.innerText;
            let addOne = parseInt(innerPCantidad);



            const btnRemoveItem = document.createElement("button");
            btnRemoveItem.classList.add("main__producto__btn", "add", "minus");
            btnRemoveItem.innerHTML = `<span
            class="main__producto__btn__plus">-</span>`;
            containerCantidad.append(btnRemoveItem);


            const btnAddItem = document.createElement("button");
            btnAddItem.classList.add("main__producto__btn", "add");
            btnAddItem.innerHTML = `<span
            class="main__producto__btn__plus ">+</span>`;
            containerCantidad.append(btnAddItem);





            const containerBtnEliminate = document.createElement("div");
            containerBtnEliminate.classList.add("order");
            divEachCarrito.append(containerBtnEliminate);

            const btnEliminate = document.createElement("button");
            btnEliminate.classList.add("main__carrito__producto__eliminate");
            btnEliminate.innerHTML = `<ion-icon name="close"></ion-icon>`;
            containerBtnEliminate.append(btnEliminate);


            divCarrito.append(divEachCarrito);


            btnEliminate.addEventListener("click", function () {
                const parent = containerBtnEliminate.parentElement;
                parent.remove();

                carrito = carrito.filter(e => e !== nombre);



                // console.log(precio * 0.9);

                // total -= precio;
                // totalPrice.innerHTML = `${total}`;

                if (jsonLocalCodigo == true || boolDescuento == true) {
                    total -= (precio * 0.9) * addOne;
                    totalPrice.innerHTML = `${total}`;
                } else {
                    total -= (precio * addOne);
                    totalPrice.innerHTML = `${total}`;
                }




            })

            btnAddItem.addEventListener("click", function () {


                addOne++;

                pCantidad.innerText = addOne;


                if (jsonLocalCodigo == true || boolDescuento == true) {
                    total += precio * 0.9;
                    totalPrice.innerHTML = `${total}`;
                } else {
                    total += precio;
                    totalPrice.innerHTML = `${total}`;
                }
            })

            btnRemoveItem.addEventListener("click", function () {

                addOne--;

                pCantidad.innerText = addOne;




                if (addOne == 0) {
                    const parent = containerBtnEliminate.parentElement;
                    parent.remove();
                    carrito = carrito.filter(e => e !== nombre);
                }



                if (jsonLocalCodigo == true || boolDescuento == true) {
                    total -= precio * 0.9;
                    totalPrice.innerHTML = `${total}`;
                } else {
                    total -= precio;
                    totalPrice.innerHTML = `${total}`;
                }
            })


        }

        console.log(carrito);


        // CODIGO DE DESCUENTO

        textoCarritoVacio.style.display = "none";

        if (jsonLocalCodigo == true) {
            totalPrice.innerHTML = `${total}`;

        } else {
            // MOSTRAMOS AL USUARIO EL TOTAL
            totalPrice.innerHTML = `${total}`;
        }


    })

}



// FUNCION PARA PEDIR PRODUCTOS CON JSON Y RENDER DE CADA PRODUCTO
const pedirProductos = async () => {
    const resp = await fetch("productos.json");
    const data = await resp.json();

    data.forEach((producto) => {
        renderEachProducto(producto.numeroImagen, producto.nombre, producto.precio, producto.cantidad);
    });
}


const funcionEleccionProducto = (productoElegido) => parseInt(prompt(`Ingresaste ${productoElegido}. Ingresá la cantidad que queres de este producto.`));

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


btnNav.addEventListener("click", () => {
    nav.style.flexDirection = "column";
    nav.style.rowGap = "1em";
    ulNav.style.display = "flex";
    btnNav.innerHTML = "<ion-icon name='close'></ion-icon>";

    if (btnNav.classList.contains("delete")) {
        btnNav.classList.remove("delete");
        nav.style.flexDirection = "row";
        ulNav.style.display = "none";
        btnNav.innerHTML = "<ion-icon name='menu'></ion-icon>";
    } else {
        btnNav.classList.add("delete");
    }

})


let ingresoPrimerProducto = "";


// CODIGO DE DESCUENTO


if (jsonLocalCodigo == true) {
    seccionIngresarCodigo.remove();
    cartelCodigoAplicado.style.display = "block";
}

btnCodigoSend.addEventListener("click", () => {
    let inputValue = inputCodigo.value.toLowerCase();

    inputValue !== "tupromo2022" && notificacionCodigo("No existe este código.", "red");

    if (inputValue == "tupromo2022") {
        boolDescuento = true;
        total *= 0.9;
        seccionIngresarCodigo.remove();
        notificacionCodigo("Código aceptado!", "#94B49F");
        cartelCodigoAplicado.style.display = "block";
        localStorage.setItem("CodigoDescuento", true);
        totalPrice.innerHTML = `${total}`;
    }

    inputCodigo.value = "";


})




