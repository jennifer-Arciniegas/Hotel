// ----------------------------------menu options
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Cambiar la visibilidad del menú
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});


//-------------------------------------- agregar al catalogo las habitaciones
const CperFiltro = document.getElementById("BedFilter")
CperFiltro.addEventListener('change', () => {
        const numperso = CperFiltro.value;
        fetch(`https://serverhotel-jnf0.onrender.com/rooms?NumPersonas=${numperso}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const catalogo = document.getElementById("catalogo");
        catalogo. innerHTML = "" // para limpiar el contenedor cuando se realice una nueva consulta

        data.forEach(element => {

            // Crear un div para la habitación
            const habitacion = document.createElement("div");        
            habitacion.classList.add("habitacion", "border", "p-4", "bg-rose-200", "rounded-lg", "w-full", "hover:scale-110", "transition-all", "duration-300", "overflow-hidden");

            // info a la habitación
            habitacion.innerHTML = `
                <a href= "../page/habitacion.html?id=${element.id}">
                <div class=" flex justify-center m-1 md:w-70 md:h-70  "> <img class="rounded-lg" src="${element.imagenes.habitacion}" alt="Imagen de la habitación" class="w-full h-auto"> </div>
                <h2 class="text-xl font-semibold">${element.name}</h2>
                <p>Número de camas: ${element.NumCamas}</p>
                <p>Ubicación: ${element.ubicacion}</p>
                <p>Precio por noche: $${element.precioNoche}</p>
                <p>Estado: ${element.Disponible}</p>
                </a>
            `;

            // Añadir la habitación al catálogo
            catalogo.appendChild(habitacion);
        });
    })
    .catch(error => console.error('Error:', error));



})

//--------------------------------ver reservas
const verReservas = document.getElementById("verReservasRealizadas");
const espacioR = document.getElementById("espacioReservas");

verReservas.addEventListener("click", async () => {

    espacioR.innerHTML = "";     // Limpiar datos anteriores

    const tablaR = document.createElement("div");
    tablaR.classList.add("overflow-x-auto");
    tablaR.innerHTML = `
        <table class="min-w-full table-auto m-4 w-full border border-orange-300">
            <thead class="bg-orange-300">
                <tr>
                    <th class="p-2 border">Habitación</th>
                    <th class="p-2 border">Fecha de inicio</th>
                    <th class="p-2 border">Fecha de salida</th>
                    <th class="p-2 border">Valor por noche</th>
                    <th class="p-2 border">Valor total</th>
                    <th class="p-2 border">Acciones</th>
                </tr>
            </thead>
            <tbody id="reservaTabla" class="text-center">
            </tbody>
        </table>
    `;

    espacioR.appendChild(tablaR);

    try {
        const response = await fetch(`https://serverhotel-jnf0.onrender.com/rooms`);
        const rooms = await response.json();

        const tBody = document.getElementById("reservaTabla");

        // Recorrer habitaciones y sus reservas
        rooms.forEach((habitacion) => {
            if (habitacion.reservas && habitacion.reservas.length > 0) {
                habitacion.reservas.forEach((reserva, index) => {
                    const { inicio, fin } = reserva;
                    const precioNoche = habitacion.precioNoche;
                    const diasReservados = calcularDias(inicio, fin);
                    const valorTotal = diasReservados * precioNoche;

                    // Crear fila de la tabla
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td class="p-2 border">${habitacion.name}</td>
                        <td class="p-2 border">${inicio}</td>
                        <td class="p-2 border">${fin}</td>
                        <td class="p-2 border">${precioNoche.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                        <td class="p-2 border">${valorTotal.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                        <td class="p-2 border">
                            <button class="bg-red-500 text-white rounded-lg p-1 hover:bg-red-700 cancelar-reserva" 
                                data-habitacion-id="${habitacion.id}" 
                                data-reserva-index="${index}">
                                Cancelar reserva
                            </button>
                        </td>
                    `;

                    tBody.appendChild(fila);
                });
            }
        });

        document.querySelectorAll(".cancelar-reserva").forEach((button) => {
            button.addEventListener("click", async (e) => {
                const habitacionId = e.target.getAttribute("data-habitacion-id");
                const reservaIndex = e.target.getAttribute("data-reserva-index");

                await cancelarReserva(habitacionId, reservaIndex);
            });
        });
    } catch (error) {
        console.error("Error al cargar las reservas:", error);
    }
});

// Función para cancelar una reserva
async function cancelarReserva(habitacionId, reservaIndex) {
    try {
        // buscar la reserva
        const response = await fetch(`https://serverhotel-jnf0.onrender.com/rooms/${habitacionId}`);
        const habitacion = await response.json();
        const nuevasReservas = habitacion.reservas.filter((_, index) => index != reservaIndex);

        // Actualizar la habitación para asi borrar la reserva
        const updateResponse = await fetch(`https://serverhotel-jnf0.onrender.com/rooms/${habitacionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reservas: nuevasReservas }),
        });

        if (updateResponse.ok) {
            alert("Reserva cancelada correctamente.");
            verReservas.click(); // Recargar las reservas
        } else {
            throw new Error("Error al actualizar la habitación.");
        }
    } catch (error) {
        console.error("Error al cancelar la reserva:", error);
    }
}

// Función para calcular la diferencia de días de reserva
function calcularDias(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferenciaTiempo = fin - inicio;
    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días
}

