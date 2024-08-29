document.addEventListener('DOMContentLoaded', function() {
	// Navbar
	const links = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('.section');

	links.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetSection = this.getAttribute('data-section');

			sections.forEach(section => {
				section.classList.toggle('d-block', section.id === targetSection);
				section.classList.toggle('d-none', section.id !== targetSection);
			});
		});
	});

	// Variables

		//Inicio
	const apiKey = 'a1bf5a215eeb56188c2e62b9e525101e';
	const climaElement = document.getElementById('clima');
	const tareasDelDiaUl = document.querySelector('#tareasDelDia ul');

		//Tareas
	const tareaForm = document.getElementById('tareaForm');
	const inputTarea = document.getElementById('inputTarea');
	const fechaTarea = document.getElementById('fechaTarea');
	const listaTareasUl = document.querySelector('#listaTareas ul');
	const tareasCompletadasUl = document.querySelector('#tareasCompletadas ul');

		//Compras
	const compraForm = document.getElementById('comprasForm');
	const inputCompra = document.getElementById('inputCompra');
	const cantidadCompra = document.getElementById('inputCantidad');
	const listaComprasUl = document.querySelector('#listaCompras ul');
	const comprasCompletadasUl = document.querySelector('#comprasCompletadas ul');
	
	let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
	let compras = JSON.parse(localStorage.getItem('compras')) || [];

	// Función para formatear la fecha al formato dd/mm/yyyy
	function formatearFecha(fecha) {
		if (!fecha) return '';
		const [anio, mes, dia] = fecha.split('-');
		return `${dia}/${mes}/${anio}`;
	}

	function mostrarTareasDelDia() {
		const tareasDelDiaUl = document.querySelector('#tareasDelDia ul');
		tareasDelDiaUl.innerHTML = '';

		// Obtener la fecha de hoy en formato dd/mm/yyyy
		const hoy = new Date();
		const dia = String(hoy.getDate()).padStart(2, '0');
		const mes = String(hoy.getMonth() + 1).padStart(2, '0');
		const anio = hoy.getFullYear();
		const fechaHoy = `${dia}/${mes}/${anio}`;

		const tareasDelDia = tareas.filter(tarea => tarea.fecha === fechaHoy);

		if (tareasDelDia.length === 0) {
			tareasDelDiaUl.innerHTML = '<li>No hay tareas para hoy.</li>';
		} else {
			tareasDelDia.forEach(tarea => {
				const li = document.createElement('li');
				li.textContent = tarea.descripcion;
				tareasDelDiaUl.appendChild(li);
			});
		}
	}

	// Función para mostrar tareas
	function mostrarTareas() {
		listaTareasUl.innerHTML = '';
		tareasCompletadasUl.innerHTML = '';

		tareas.forEach(tarea => {
			const li = document.createElement('li');
			li.className = 'list-group-item d-flex align-items-center justify-content-between';
			li.innerHTML = `
				<div class="d-flex align-items-center">
					<input type="checkbox" class="check-tarea me-2" data-id="${tarea.id}" ${tarea.completada ? 'checked' : ''}>
					${tarea.descripcion} - <small>${tarea.fecha || 'Sin fecha'}</small>
				</div>
				<button class="btn btn-danger btn-sm float-end eliminar" data-id="${tarea.id}"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
			`;
			if (tarea.completada) {
				tareasCompletadasUl.appendChild(li);
			} else {
				listaTareasUl.appendChild(li);
			}
		});

		mostrarTareasDelDia(); // Actualizar la lista de tareas del día
	}

	// Función para mostrar compras
	function mostrarCompras() {
		listaComprasUl.innerHTML = '';
		comprasCompletadasUl.innerHTML = '';

		compras.forEach(compra => {
			const li = document.createElement('li');
			li.className = 'list-group-item d-flex align-items-center justify-content-between';
			li.innerHTML = `
				<div class="d-flex align-items-center">
					<input type="checkbox" class="check-compra me-2" data-id="${compra.id}" ${compra.completada ? 'checked' : ''}>
					${compra.descripcion} - Cantidad: ${compra.cantidad}
				</div>
				<button class="btn btn-danger btn-sm float-end eliminar" data-id="${compra.id}"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
			`;
			if (compra.completada) {
				comprasCompletadasUl.appendChild(li);
			} else {
				listaComprasUl.appendChild(li);
			}
		});
	}

	// Eventos Tareas submit
	tareaForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const descripcion = inputTarea.value.trim();
		const fecha = formatearFecha(fechaTarea.value.trim());

		if (!descripcion) {
			swal.fire({
				title: "¡Hola!",
				text: "Por favor, ingresa una tarea.",
				icon: "warning",
				timer: 3000,
				toast: true,
				showConfirmButton: false,
				timerProgressbar: true
			});
			return;
		}

		let id;
		if (tareas.length) {
			id = tareas[tareas.length - 1].id + 1;
		} else {
			id = 1;
		}

		tareas.push({ id, descripcion, completada: false, fecha });
		guardarTareas();

		inputTarea.value = '';
		fechaTarea.value = '';
		mostrarTareas();
	});

	// Eventos Tareas eliminar/check
	listaTareasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			tareas = tareas.filter(tarea => tarea.id !== id);
		} else if (e.target.classList.contains('check-tarea')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			tareas = tareas.map(tarea => {
				if (tarea.id === id) {
					tarea.completada = e.target.checked;
				}
				return tarea;
			});
		}
		guardarTareas();
		mostrarTareas();
	});

	// Eventos Tareas completadas eliminar/check
	tareasCompletadasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('check-tarea')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			tareas = tareas.map(tarea => {
				if (tarea.id === id) {
					tarea.completada = e.target.checked;
				}
				return tarea;
			});
		} else if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			tareas = tareas.filter(tarea => tarea.id !== id);
		}
		guardarTareas();
		mostrarTareas();
	});

	// Eventos Compras submit
	compraForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const descripcion = inputCompra.value.trim();
		const cantidad = cantidadCompra.value.trim();

		if (!descripcion || !cantidad) {
			swal.fire({
				title: "¡Hola!",
				text: "Por favor, ingresa un producto y una cantidad.",
				icon: "warning",
				timer: 3000,
				toast: true,
				showConfirmButton: false,
				timerProgressbar: true
			});
			return;
		}

		let id;
		if (compras.length) {
			id = compras[compras.length - 1].id + 1;
		} else {
			id = 1;
		}

		compras.push({ id, descripcion, cantidad, completada: false });
		guardarCompras();

		inputCompra.value = '';
		cantidadCompra.value = '';
		mostrarCompras();
	});

	// Eventos Compras eliminar/check
	listaComprasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			compras = compras.filter(compra => compra.id !== id);
		} else if (e.target.classList.contains('check-compra')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			compras = compras.map(compra => {
				if (compra.id === id) {
					compra.completada = e.target.checked;
				}
				return compra;
			});
		}
		guardarCompras();
		mostrarCompras();
	});

	// Eventos Compras completadas eliminar/check
	comprasCompletadasUl.addEventListener('click', function(e) {
		if (e.target.classList.contains('check-compra')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			compras = compras.map(compra => {
				if (compra.id === id) {
					compra.completada = e.target.checked;
				}
				return compra;
			});
		} else if (e.target.classList.contains('eliminar')) {
			const id = parseInt(e.target.getAttribute('data-id'));
			compras = compras.filter(compra => compra.id !== id);
		}
		guardarCompras();
		mostrarCompras();
	});

	// Funciones de almacenamiento
	function guardarTareas() {
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}

	function guardarCompras() {
		localStorage.setItem('compras', JSON.stringify(compras));
	}

	// Clima
	function obtenerClima() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;
					const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

					try {
						fetch(url)
							.then(response => {
								if (!response.ok) {
									throw new Error(`Error en la solicitud: ${response.status}`);
								}
								return response.json();
							})
							.then(data => {
								const temperatura = data.main.temp;
								const descripcion = data.weather[0].description;
								const ciudad = data.name;
								const icono = data.weather[0].icon;
								const humedad = data.main.humidity;
								const viento = data.wind.speed;

								let iconoTemp = 'fa-temperature-quarter';

								if (data.main.temp < 20) {
									iconoTemp = 'fa-temperature-arrow-down';
								} else if (data.main.temp >= 20) {
									iconoTemp = 'fa-temperature-arrow-up';
								}

								const climaHTML = `
									<h3>Clima en ${ciudad}</h3>
									<img src="http://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
									<p>Temperatura: ${temperatura} °C <i class="fa-solid ${iconoTemp}"></i></p>
									<p>Descripción: ${descripcion}</p>
									<p>Humedad: ${humedad}% <i class="fa-solid fa-water"></i></p>
									<p>Velocidad del viento: ${viento} m/s <i class="fa-solid fa-wind"></i></p>
								`;
								climaElement.innerHTML = climaHTML;
							})
							.catch(error => {
								console.error('Error al obtener los datos del clima:', error);
								climaElement.innerHTML = '<p>No se pudo obtener la información del clima.</p>';
							});
					} catch (error) {
						console.error('Error inesperado al obtener el clima:', error);
						climaElement.innerHTML = '<p>Ocurrió un error inesperado al obtener la información del clima.</p>';
					}
				},
				function(error) {
					console.error('Error al obtener la ubicación:', error);
					climaElement.innerHTML = '<p>No se pudo obtener la ubicación del usuario.</p>';
				}
			);
		} else {
			climaElement.innerHTML = '<p>La geolocalización no está soportada por este navegador.</p>';
		}
	}

	// Inicializar todo
	mostrarTareas();
	mostrarCompras();
	obtenerClima();
});
