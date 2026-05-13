document.addEventListener("DOMContentLoaded", function () {

    let usuario = sessionStorage.getItem("usuario");

    if (usuario) {
        mostrarBienvenida();
    } else {
        document.getElementById("boton-formulario").addEventListener("click", function (event) {
            if (!document.getElementById("usuario").value) {
                alert("Debes de introducir tu usuario");
                event.preventDefault();
            } else if (!document.getElementById("contraseña-usuario").value) {
                alert("Debes de introducir una contraseña");
            } else {
                sessionStorage.setItem("usuario", document.getElementById("usuario").value);
                if (requisitosMinimos()) {
                    alert("Inicio de sesión correcto")
                    mostrarBienvenida();
                } else {
                    event.preventDefault();
                }
            }
        });
    }
    let aside = document.querySelector("aside");
    let divSkins = document.createElement("div");
    divSkins.className = "div-flex-skins";
    aside.parentElement.appendChild(divSkins);
    cargarSkins(divSkins);
});


async function cargarSkins(divSkins) {
    try {
        let respuesta = await fetch('skins.json');

        let dades = await respuesta.json();

        for (let i = 0; i < dades.skins.length; i++) {
            let skin = dades.skins[i];

            let div = document.createElement("div");
            div.className = "skin-arma-skins";

            let skinImagen = document.createElement("div");
            skinImagen.className = "skin-imagen";
            let img = document.createElement("img");
            img.src = skin.imagen;
            img.alt = skin.nombre;
            skinImagen.appendChild(img);

            let nombre = document.createElement("p");
            nombre.textContent = skin.nombre;

            let skinDescripcion = document.createElement("div");
            skinDescripcion.className = "skin-descripcion";
            let precio = document.createElement("p");
            precio.className = "skin-precio";
            precio.textContent = skin.precio + ' €';
            let colaboracion = document.createElement("p");
            colaboracion.className = "skin-colaboración";
            colaboracion.textContent = skin.colaboracion;
            skinDescripcion.appendChild(precio);
            skinDescripcion.appendChild(colaboracion);

            let carritoDiv = document.createElement("div");
            let imgCarrito = document.createElement("img");
            imgCarrito.className = "img-carrito";
            imgCarrito.src = "https://static.thenounproject.com/png/remove-from-cart-icon-1779782-512.png";
            imgCarrito.alt = "Añadir al carrito";
            carritoDiv.appendChild(imgCarrito);

            let nombreSkin = skin.nombre;
            imgCarrito.addEventListener("click", function () {
                if (imgCarrito.src.includes("remove-from-cart-icon-1779782")) {
                    sessionStorage.setItem(nombreSkin, nombreSkin);
                } else {
                    sessionStorage.removeItem(nombreSkin);
                }
            });

            div.appendChild(skinImagen);
            div.appendChild(nombre);
            div.appendChild(skinDescripcion);
            div.appendChild(carritoDiv);

            divSkins.appendChild(div);
        }

        let cartImgs = document.querySelectorAll('.img-carrito');
        cartImgs.forEach(img => {
            img.addEventListener('click', function () {
                if (img.src.includes('remove-from-cart-icon-1779782')) {
                    img.src = 'https://static.thenounproject.com/png/remove-cart-icon-1779784-512.png';
                } else {
                    img.src = 'https://static.thenounproject.com/png/remove-from-cart-icon-1779782-512.png';
                }
            });
        });

    } catch (error) {
        console.error("Error cargando skins:", error);
    }
}


function mostrarBienvenida() {
    let inicioSesion = document.getElementById("iniciar-sesion");
    let textoNuevo = document.createElement("p");
    textoNuevo.style.display = "inline";
    textoNuevo.style.marginRight = "20px";
    textoNuevo.textContent = sessionStorage.getItem("usuario");
    let input = document.getElementById("usuario");
    inicioSesion.replaceChild(textoNuevo, input);

    inicioSesion.removeChild(document.getElementById("boton-formulario"));

    inicioSesion.removeChild(document.getElementById("contraseña-usuario"));

    let bottonNuevo = document.createElement("button");
    bottonNuevo.textContent = "Cerrar sesion";
    bottonNuevo.id = "botonCerrar";
    inicioSesion.appendChild(bottonNuevo);

    document.getElementById("botonCerrar").addEventListener("click", function () {
        sessionStorage.removeItem("usuario");
        cerrarSesion();
    });
}

function cerrarSesion() {
    alert("Sesion cerrada correctamente")
}

function requisitosMinimos() {
    let minuscula = false;
    let mayusculas = false;
    let mincaract = false;
    let maxcaract = false;
    let digito = false;
    let contraseña = document.getElementById("contraseña-usuario").value;

    if (contraseña.length < 6) {
        alert("La contraseña debe ser entre 6 - 12 carácteres");
    } else {
        mincaract = true;
    }

    if (contraseña.length > 12) {
        alert("La contraseña debe ser entre 6 - 12 carácteres");
    } else {
        maxcaract = true;
    }

    for (let i = 0; i < contraseña.length; i++) {
        let caract = contraseña.charAt(i);
        if (caract.toUpperCase() === caract) {
            mayusculas = true;
        }
        if (caract.toLowerCase() === caract) {
            minuscula = true;
        }
        if (caract >= '0' && caract <= '9') {
            digito = true
        }
    }
    return mincaract && minuscula && mayusculas && maxcaract && digito
}
