let carrito = [];

let envioBase = localStorage.getItem("envioGeneral") 
    ? parseInt(localStorage.getItem("envioGeneral")) 
    : 300;

let precioCamisa = localStorage.getItem("precioCamisa") 
    ? parseInt(localStorage.getItem("precioCamisa")) 
    : 1200;

let precioZapatos = localStorage.getItem("precioZapatos") 
    ? parseInt(localStorage.getItem("precioZapatos")) 
    : 2500;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    mostrarCarrito();
}

function mostrarCarrito() {
    let lista = document.getElementById("listaCarrito");
    let total = 0;
    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        total += producto.precio;
        lista.innerHTML += `
            <li>
                ${producto.nombre} - RD$${producto.precio}
                <button onclick="eliminarProducto(${index})">X</button>
            </li>
        `;
    });

    document.getElementById("subtotal").innerText = total;
    document.getElementById("envioMostrado").innerText = envioBase; // 👈 ESTA LÍNEA
    document.getElementById("total").innerText = total + envioBase;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

function enviarPedido() {
    let nombre = document.getElementById("nombreCliente").value;
    let ciudad = document.getElementById("ciudad").value;
    let metodoPago = document.getElementById("metodoPago").value;

    let mensaje = "🛒 Pedido MisVentasRD\n\n";
    carrito.forEach(p => {
        mensaje += `${p.nombre} - RD$${p.precio}\n`;
    });

    mensaje += `\nEnvío: RD$${envioBase}`;
    mensaje += `\nTotal: RD$${document.getElementById("total").innerText}`;
    mensaje += `\n\nCliente: ${nombre}`;
    mensaje += `\nCiudad: ${ciudad}`;
    mensaje += `\nPago: ${metodoPago}`;

    window.open(`https://wa.me/18496569368?text=${encodeURIComponent(mensaje)}`);
}
