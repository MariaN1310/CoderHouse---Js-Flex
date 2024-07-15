const listaProductos = [];
const listaToDo = [];

let idToDo = 1;
let idProductos = 1;

let lista = "";
let lista2 = "";

function pedirTipoLista() {
	let tipoLista = parseInt(prompt("Hola " + nombre + "\n¿Queres crear una lista de compras o de cosas por hacer? \n\n 1- Lista de compras \n 2- Lista de cosas por hacer \n\n Por favor ingresa el numero que quieres"));

	if (tipoLista === 1) {
		agregarProducto();
	} else if (tipoLista === 2) {
		agregarToDo();
	} else if (tipoLista === null || tipoLista === "") {
		alert("Gracias por usar el programa.");
	}
}

function agregarProducto() {
	while (true) {
		let producto = prompt("Nombre del Producto (Cancelar para ver lista)");

		if (producto === null || producto === "") {
			marcarProductoComprado();
			break;
		}

		let cantidad = prompt("Cantidad de " + producto);
		let estado = "Por Comprar";

		const productos = { idProductos, producto, cantidad, estado };
		listaProductos.push(productos);
		idProductos += 1;
	}
}

function agregarToDo() {
	while (true) {
		let tarea = prompt("¿Que tenes que hacer? (Cancelar para ver lista)");

		if (tarea === null || tarea === "") {
			marcarTareaHecha();
			break;
		}

		let estadoToDo = "Por Hacer";

		const tarea2 = { idToDo, tarea, estadoToDo };
		listaToDo.push(tarea2);
		idToDo += 1;
	}
}

function marcarProductoComprado() {
	lista = "";
	for (let i = 0; i < listaProductos.length; i++) {
		lista += listaProductos[i].idProductos + ") Producto: " + listaProductos[i].producto + " - Cantidad: " + listaProductos[i].cantidad + " - " + listaProductos[i].estado + "\n";
	}
	
	while (true) {
		let hayPorComprar  = false;
		for (let i = 0; i < listaProductos.length; i++) {
			if (listaProductos[i].estado === "Por Comprar") {
				hayPorComprar = true;
				break;
			}
		}

		if (!hayPorComprar) {
			pedirTipoLista();
			break;
		}

		let respuesta = prompt("Esta es tu lista de compras, \nSi queres marcar algun producto como comprado, ingresa el numero:\n(Cancelar para salir)\n\n" + lista);

		if (respuesta === null || respuesta === "") {
			pedirTipoLista();
			break;
		}

		respuesta = parseInt(respuesta);
		let productoEncontrado = false;

		for (let i = 0; i < listaProductos.length; i++) {
			if (listaProductos[i].idProductos === respuesta) {
				if (listaProductos[i].estado === "Por Comprar") {
					listaProductos[i].estado = "Comprado";
					productoEncontrado = true;
					break;
				}
			}
		}

		if (!productoEncontrado) {
			alert("Producto numero " + respuesta + " no encontrado o ya esta comprado.");
		} else {
			marcarProductoComprado();
		}
	}
}

function marcarTareaHecha() {
	lista2 = "";
	for (let i = 0; i < listaToDo.length; i++) {
		lista2 += listaToDo[i].idToDo + ") Tarea: " + listaToDo[i].tarea + " - " + listaToDo[i].estadoToDo + "\n";
	}
	
	while (true) {
		let hayPorHacer = false;
		for (let i = 0; i < listaToDo.length; i++) {
			if (listaToDo[i].estadoToDo === "Por Hacer") {
				hayPorHacer = true;
				break;
			}
		}

		if (!hayPorHacer) {
			pedirTipoLista();
			break;
		}

		let respuesta2 = prompt("Esta es tu lista de tareas, \nSi queres marcar algo como hecho, pon el numero:\n(Cancelar para salir)\n\n" + lista2);

		if (respuesta2 === null || respuesta2 === "") {
			pedirTipoLista();
			break;
		}

		respuesta2 = parseInt(respuesta2);
		let tareaEncontrada = false;

		for (let i = 0; i < listaToDo.length; i++) {
			if (listaToDo[i].idToDo === respuesta2) {
				if (listaToDo[i].estadoToDo === "Por Hacer") {
					listaToDo[i].estadoToDo = "Hecho";
					tareaEncontrada = true;
					break;
				}
			}
		}

		if (!tareaEncontrada) {
			alert("Tarea numero " + respuesta2 + " no encontrada o hecha.");
		} else {
			marcarTareaHecha();
		}
	}
}

alert("Bienvenido a la App Lista de Compras y Lista de Tareas");

let nombre = prompt("Por favor ingrese su nombre");
pedirTipoLista();
