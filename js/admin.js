const tablaUsuarios = document.querySelector('#tablaUsuarios');
const validarProducto = document.querySelector('#validarProducto');
const tablaProducto = document.querySelector('#tablaProducto');
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
const productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];
validarProducto.addEventListener('submit', crearProducto);

//creamos el molde para crear un objeto
class Producto {
	constructor(id, nombre, precio, descripcion) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.descripcion = descripcion;
	}
}

function cargarUsuarios() {
	usuariosRegistrados.map(function (usuario) {
		//creamos una etiqueta tr
		const tr = document.createElement('tr');
		//a esa etiqueta TR le implementamos los td con la informacion del usuario que se este iterando
		tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        `;
		//incrustamos en el tbody el tr
		tablaUsuarios.appendChild(tr);
	});
}

cargarUsuarios();

function crearProducto(e) {
	e.preventDefault();
	const id = Date.now();
	const nombre = document.querySelector('#nombre').value;
	const precio = document.querySelector('#precio').value;
	const descripcion = document.querySelector('#descripcion').value;

	//validar campos ACA
	//ustedes tienen que hacerlo el profe ya se los enseño

	const newProduct = new Producto(id, nombre, precio, descripcion);
	productosRegistrados.push(newProduct);

	localStorage.setItem('productos', JSON.stringify(productosRegistrados));

	validarProducto.reset();
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Producto Agregado Exitosamente',
		showConfirmButton: false,
		timer: 1500,
	});
	cargarProductos();
}

function cargarProductos() {
	tablaProducto.innerHTML = '';

	productosRegistrados.map(function (producto) {
		//creamos una etiqueta tr
		const tr = document.createElement('tr');
		//a esa etiqueta TR le implementamos los td con la informacion del usuario que se este iterando
		tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
        </td>
        `;
		//incrustamos en el tbody el tr
		tablaProducto.appendChild(tr);
	});
}

cargarProductos();
