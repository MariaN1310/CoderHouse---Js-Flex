document.addEventListener('DOMContentLoaded', function() {
	const tareaForm = document.getElementById('tareaForm');
	const comprasForm = document.getElementById('comprasForm');

	const inputTarea = document.getElementById('inputTarea');
	const inputCompras = document.getElementById('inputCompras');
	const inputCantidad = document.getElementById('inputCantidad');

	const listaTareasUl = document.querySelector('#listaTareas ul');
	const listaComprasUl = document.querySelector('#listaCompras ul');

	let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
	let compras = JSON.parse(localStorage.getItem('compras')) || [];

	function mostrarTareas() {
		listaTareasUl.innerHTML = '';
		tareas.forEach(function(objetoTarea) {
			const li = document.createElement('li');
			li.className = 'list-group-item';
			li.innerHTML = `
				${objetoTarea.descripcion}
				<button class="btn btn-danger btn-sm float-end eliminar" data-id="${objetoTarea.id}">Eliminar</button>
			`;
			listaTareasUl.appendChild(li);
		});
	}

	function mostrarCompras() {
		listaComprasUl.innerHTML = '';
		compras.forEach(function(objetoCompras) {
			const li2 = document.createElement('li');
			li2.className = 'list-group-item';
			li2.innerHTML = `
				${objetoCompras.descripcion} - ${objetoCompras.cantidad}
				<button class="btn btn-danger btn-sm float-end eliminar" data-id="${objetoCompras.id}">Eliminar</button>
			`;
			listaComprasUl.appendChild(li2);
		});
	}

	tareaForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const descripcion = inputTarea.value.trim();
		
		if (descripcion === '') {
			alert('Por favor, ingresa una tarea.'); // sacar, poner alerta en bootstrap
			return;
		}
		
		let id;
		if (tareas.length > 0) {
			const ultimoTarea = tareas[tareas.length - 1];
			id = ultimoTarea.id + 1;
		} else {
			id = 1;
		}
		
		const objetoTarea = {
			id: id,
			descripcion: descripcion
		};
		
		tareas.push(objetoTarea);
		
		localStorage.setItem('tareas', JSON.stringify(tareas));

		inputTarea.value = '';
		mostrarTareas();
	});

	comprasForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const descripcionCompra = inputCompras.value.trim();
		const descripcionCantidad = inputCantidad.value.trim();
		
		if (descripcionCompra === '') {
			alert('Por favor, ingresa una compra.'); // sacar, poner alerta en bootstrap
			return;
		}
		
		let id;
		if (compras.length > 0) {
			const ultimaCompra = compras[compras.length - 1];
			id = ultimaCompra.id + 1;
		} else {
			id = 1;
		}
		
		const objetoCompra = {
			id: id,
			descripcion: descripcionCompra,
			cantidad: descripcionCantidad
		};
		
		compras.push(objetoCompra);
		
		localStorage.setItem('compras', JSON.stringify(compras));

		inputCompras.value = '';
		inputCantidad.value = '';
		inputCompras.focus();
		mostrarCompras();
	});
	
	// Eliminar Tareas
	listaTareasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));

			tareas = tareas.filter(function(objetoTarea) {
				return objetoTarea.id !== id;
			});

			localStorage.setItem('tareas', JSON.stringify(tareas));
			mostrarTareas();
		}
	});

	// Eliminar Compras
	listaComprasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));

			compras = compras.filter(function(objetoCompra) {
				return objetoCompra.id !== id;
			});

			localStorage.setItem('compras', JSON.stringify(compras));
			mostrarCompras();
		}
	});

	mostrarTareas();
	mostrarCompras();
});
