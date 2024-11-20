//creo un array usando localStorage llamado catalogo en el que se van a guardar los productos que se ingresen 
let catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];

function guardarEnLocalStorage() {
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
}
// esta funcion es para poder agg un producto
function agregarProducto(nombre, precio, stock, categoria) {
    let productoExistente = catalogo.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        console.log(`El producto con nombre ${nombre} ya existe.`);
        return;
    }
// guarda los nuevos productos en una varialble
    let nuevoProducto = { nombre, precio, stock, categoria };
    catalogo.push(nuevoProducto);
    guardarEnLocalStorage();
    actualizarTabla();
}
// se encarga de 
function listarProductos() {
    actualizarTabla();
}
// para que el boton de buscar productos funcione
function buscarPorCategoria(categoria) {
    let productosFiltrados = catalogo.filter(producto => producto.categoria === categoria);
    actualizarTabla(productosFiltrados);
}
// esta funcion es la encargada de poder actualizar el el stock de un producto y en caso de que el productp no se encuentre se mostrarwa un error 
function actualizarStock(nombre, nuevoStock) {
    let producto = catalogo.find(producto => producto.nombre === nombre);
    if (producto) {
        producto.stock = nuevoStock;
        console.log(`El stock de ${nombre} ha sido actualizado a ${nuevoStock}.`);
        guardarEnLocalStorage();
        actualizarTabla();
    } else {
        console.log(`Producto con nombre ${nombre} no encontrado.`);
    }
}
//elimina todos los producctos que ingrese con el mismo nombre y en caso de que no se encuentre el producto va a mostrar un error 
function eliminarProducto(nombre) {
    const nuevosProductos = catalogo.filter(producto => producto.nombre !== nombre);
    
    if (nuevosProductos.length < catalogo.length) {
        catalogo = nuevosProductos;
        console.log(`Todos los productos con el nombre ${nombre} han sido eliminados.`);
        guardarEnLocalStorage();
        actualizarTabla();
    } else {
        console.log(`Producto con nombre ${nombre} no encontrado.`);
    }
}
// esta funciom es para calcular en total del inventario 
function calcularValorTotalInventario() {
    let valorTotal = 0;
    catalogo.forEach(producto => {
        valorTotal += producto.precio * producto.stock;
    });
    console.log(`El valor total del inventario es: ${valorTotal}`);
}
// se encarga de        
function actualizarTabla(productos = catalogo) {
    let tbody = document.querySelector("#tablaProductos tbody");
    tbody.innerHTML = "";
    productos.forEach(producto => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
        `;
        tbody.appendChild(fila);
    });
}

function mostrarFormulario(formularioId) {
    document.querySelectorAll('#formularios form').forEach(form => {
        form.style.display = 'none';
    });
    document.getElementById(formularioId).style.display = 'block';
}

function procesarFormularioAgregar(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let precio = parseFloat(document.getElementById('precio').value);
    let stock = parseInt(document.getElementById('stock').value);
    let categoria = document.getElementById('categoria').value;
    agregarProducto(nombre, precio, stock, categoria);
    document.getElementById('formAgregar').reset();
    document.getElementById('formAgregar').style.display = 'none';
}

function procesarFormularioBuscar(event) {
    event.preventDefault();
    let categoria = document.getElementById('categoriaBuscar').value;
    buscarPorCategoria(categoria);
    document.getElementById('formBuscar').reset();
    document.getElementById('formBuscar').style.display = 'none';
}

function procesarFormularioActualizar(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombreActualizar').value;
    let nuevoStock = parseInt(document.getElementById('nuevoStock').value);
    actualizarStock(nombre, nuevoStock);
    document.getElementById('formActualizar').reset();
    document.getElementById('formActualizar').style.display = 'none';
}

function procesarFormularioEliminar(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombreEliminar').value;
    eliminarProducto(nombre);
    document.getElementById('formEliminar').reset();
    document.getElementById('formEliminar').style.display = 'none';
}


 console.log(localStorage.getItem("catalogo"))  