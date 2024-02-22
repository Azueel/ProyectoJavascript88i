//creamos un molde para que toda la informacion que estaba suelta se guarde en un objeto todo junto
class Usuario {
	constructor(id, nombre, email, password) {
		this.id = id;
		this.nombre = nombre;
		this.email = email;
		this.password = password;
	}
}

const validarRegistro = document.querySelector('#validarRegistro');

validarRegistro.addEventListener('submit', validarUsuario);

//esta variable almacena la lista de todos los usuarios registrado
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

function validarUsuario(e) {
	e.preventDefault();
	//estas variables almacenan el valor de los input al ejecutarse el submit
	const id = Date.now();
	const nombre = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	const confirmPassword = document.querySelector('#confirmPassword').value;

	//expresion regular para validar email
	const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const resultadoValidacion = validarEmail.test(email);

	//validaciones aca
	if (!resultadoValidacion) {
		console.log('no es un email valido');
	} //sigan con todas las que faltan

	//una vez pasada las validaciones
	//tenemos que comprobar si el usuario ya esta registrado con el email
	const comprobandoEmail = usuariosRegistrados.find(function (usuario) {
		return usuario.email === email;
	});

	if (comprobandoEmail !== undefined) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'El Correo ingresado ya esta Registrado!',
		});
		return;
	}

	//si llega hasta aca es porque ya esta para registrarlo
	const newUser = new Usuario(id, nombre, email, password);
	//agrego en la lista de usuarios registrados, el nuevo usuario
	usuariosRegistrados.push(newUser);
	//guardamos en el localStorage la lista incluyendo al nuevo usuario
	localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Usuario Registrado Correctamente',
		showConfirmButton: false,
		timer: 1500,
	});

	validarRegistro.reset();
}
