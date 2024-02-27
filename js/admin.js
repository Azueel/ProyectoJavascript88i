const tablaUsuarios = document.querySelector('#tablaUsuarios');
const validarProducto = document.querySelector('#validarProducto');
const tablaProducto = document.querySelector('#tablaProducto');
const formularioEditar = document.querySelector('#validarProductoEditar');
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
let productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];
validarProducto.addEventListener('submit', crearProducto);
formularioEditar.addEventListener('submit', editarProducto);

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
            <button class="btn btn-primary" onclick="modalEditarProducto(${producto.id})">Editar</button>
            <button class="btn btn-danger" onclick="borrarProducto(${producto.id})">Eliminar</button>
        </td>
        `;
		//incrustamos en el tbody el tr
		tablaProducto.appendChild(tr);
	});
}

cargarProductos();

function borrarProducto(id) {
	productosRegistrados = productosRegistrados.filter(function (producto) {
		return producto.id !== id;
	});

	localStorage.setItem('productos', JSON.stringify(productosRegistrados));

	cargarProductos();
}

function modalEditarProducto(id) {
	//traemos el id del producto a editar y comparamos entre todos los productos a ver si encuentra uno igual
	const producto = productosRegistrados.find(function (producto) {
		return producto.id == id;
	});

	//en el caso que encontro un id igual me retorna el objeto con toda la informacion del elemento encontrado
	//agarramos los inputs del formulario editar y los llenamos con la informacion del producto que encontramos
	document.querySelector('#nombreEditar').value = producto.nombre;
	document.querySelector('#precioEditar').value = producto.precio;
	document.querySelector('#descripcionEditar').value = producto.descripcion;

	//guardamos el id en un atributo porque lo necesitaremos en un futuro
	formularioEditar.setAttribute('data-id', id);

	//por defecto el modal esta en none(oculto) y lo que hacemos es pasarlo a block para que sea visible al clickear editar
	document.querySelector('#productoEditar').style.display = 'block';
}

function editarProducto(e) {
	e.preventDefault();

	// cuando el usuario apreta submit vemos los valores de los input
	const nombreEditar = document.querySelector('#nombreEditar').value;
	const precioEditar = document.querySelector('#precioEditar').value;
	const descripcionEditar = document.querySelector('#descripcionEditar').value;

	//validaciones... validen a ver si todos los campos los ingreso NUNCA CONFIEN EN EL CLIENTE
	//

	//recuperamos el ID
	const id = formularioEditar.getAttribute('data-id');

	//FindIndex nos devuelve la posicion de la condicion que definimos si se cumple
	//en este caso comparamos todos los id de los productos con el que se habia editado, y me devuelve la posicion del que sea igual
	const productoIndex = productosRegistrados.findIndex(function (producto) {
		return producto.id == parseInt(id);
	});

	//remplazamo los valores del producto encontrado por los valores nuevos editados
	productosRegistrados[productoIndex].nombre = nombreEditar;
	productosRegistrados[productoIndex].precio = precioEditar;
	productosRegistrados[productoIndex].descripcion = descripcionEditar;

	//ocultamos el modal
	document.querySelector('#productoEditar').style.display = 'none	';

	//guardamos en el localStorage
	localStorage.setItem('productos', JSON.stringify(productosRegistrados));

	//refrescamos la tabla para que muestre el valor actualizado
	cargarProductos();
}
