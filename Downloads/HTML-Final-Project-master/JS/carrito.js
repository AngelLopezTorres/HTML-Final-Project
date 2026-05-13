document.addEventListener("click", function (event) {
    let click = event.target;

    if (click.classList.contains("img-carrito")) {
        let contenedor = click.parentNode.parentNode;
        let nombreArma = contenedor.querySelector("p").textContent;

        if (click.src.includes("remove-cart-icon-1779784")) {
            sessionStorage.setItem(nombreArma, nombreArma);
        } else {
            sessionStorage.removeItem(nombreArma);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let panelSkins = document.querySelector(".div-flex-skins");
    if (!document.querySelector(".carrito-resumen")) {
        return;
    }
    if (panelSkins) {
        panelSkins.remove();
    }

    mostrarCarrito();
});

async function mostrarCarrito() {
    let respuesta = await fetch("skins.json");
    let datos = await respuesta.json();
    let seccionItems = document.querySelector(".carrito-skins");

    for (let i = 0; i < datos.skins.length; i++) {
        let skin = datos.skins[i];


        if (sessionStorage.getItem(skin.nombre)) {
            let div = document.createElement("div");
            div.className = "skin-carrito";

            let img = document.createElement("img");
            img.src = skin.imagen;
            img.alt = skin.nombre;

            let info = document.createElement("div");
            info.className = "skin-info";

            let pNombre = document.createElement("p");
            pNombre.className = "skin-nombre";
            pNombre.textContent = skin.nombre;

            let pColaboracion = document.createElement("p");
            pColaboracion.className = "skin-colaboracion";
            pColaboracion.textContent = skin.colaboracion;

            info.appendChild(pNombre);
            info.appendChild(pColaboracion);

            let pPrecio = document.createElement("p");
            pPrecio.className = "skin-precio";
            pPrecio.textContent = skin.precio + " €";

            let btnEliminar = document.createElement("button");
            btnEliminar.className = "skin-eliminar";
            btnEliminar.textContent = "Eliminar";

            let nombreSkin = skin.nombre;
            btnEliminar.addEventListener("click", function () {
                sessionStorage.removeItem(nombreSkin);
                div.remove();
                actualizarResumen();
            });

            div.appendChild(img);
            div.appendChild(info);
            div.appendChild(pPrecio);
            div.appendChild(btnEliminar);
            seccionItems.appendChild(div);
        }
    }
    actualizarResumen();
}

function actualizarResumen() {
    let precioProducto = document.querySelectorAll(".skin-carrito");
    let total = 0;

    for (let i = 0; i < precioProducto.length; i++) { // Leemos el precio del item (ej: "189.00 €") y lo convertimos a número

        let precioTexto = precioProducto[i].querySelector(".skin-precio").textContent;
        total = total + parseFloat(precioTexto);
    }

    // Actualizamos el resumen del aside
    document.querySelector(".resumen-item p:first-child").textContent = "Total armas (" + precioProducto.length + " armas)";
    document.querySelector(".resumen-item .resumen-valor").textContent = total + " €";
    document.querySelector(".resumen-total p:last-child").textContent = total + " €";
}