document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID de la habitación desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idroom = urlParams.get("id");

    if (!idroom) {
        console.error("No se proporcionó un ID de habitación en la URL.");
        return;
    }

    // Consultar los datos de la habitación desde la API
    fetch(`https://serverhotel-jnf0.onrender.com/rooms/${idroom}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo obtener los datos de la habitación.");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            // Mostrar información de la habitación
            const espacioRoom = document.getElementById("infoRoom");
            espacioRoom.innerHTML = ""; // Limpia contenido previo

            const room = document.createElement("div");
            room.classList.add("m2", "bg-rose-100", "m-4", "w-80");
            room.innerHTML = `
                <h2> Habitación: ${data.name} </h2>
                <p> Precio por noche: ${data.precioNoche}</p>
                <ul>
                    <li> Número de personas: ${data.NumPersonas} </li>
                    <li> Camas: ${data.NumCamas} </li>
                    <li> Ubicación: ${data.ubicacion} </li>
                </ul>
                <button class="bg-blue-300 rounded-lg m-4 p-2" id="reservarYa">Reservar</button>
            `;
            espacioRoom.appendChild(room);

            // Mostrar imagen de la habitación
            const imagenRoom = document.getElementById("carruselRoom");
            imagenRoom.innerHTML = ""; // Limpia contenido previo
            const roomIMG = document.createElement("div");
            roomIMG.classList.add("flex", "justify-end");
            roomIMG.innerHTML = `
                <img class="md:w-100" src="${data.imagenes.habitacion}" alt="Imagen de la habitación" class="w-full h-auto">
            `;
            imagenRoom.appendChild(roomIMG);

            // Configurar el botón para mostrar el formulario de reserva
            document.getElementById("reservarYa").addEventListener("click", () => {
                mostrarReserva(espacioRoom, idroom, data.reservas);
            });
        })
        .catch((error) => console.error("Error al consultar en la API:", error));
});

// Mostrar el formulario de reserva
function mostrarReserva(container, roomID, reservasActuales) {
    container.innerHTML = ""; // Limpia el contenedor antes de añadir el formulario

    const reservation = document.createElement("div");
    reservation.classList.add("m-4", "bg-rose-100");
    reservation.innerHTML = `
       
        <div class="flex justify-center">
        <h2 class="text-2xl font-bold mb-4">Reserva</h2>
        </div>
        <form id="formu-reservation" class="m-4">
            <label for="fechaInicio">Fecha de ingreso:</label>
            <input type="date" name="fechaInicio" id="fechaInicio" required>
            <br>
            <label for="fechaFin">Fecha de salida:</label>
            <input type="date" name="fechaFin" id="fechaFin" required>
            <br>
            <label>
                <p class="m-4">La hora de entrada a su habitación es a las 14:00 horas. Si no ha llegado y realizado el check-in a las 16:00 horas, su reserva podría ser cancelada y la habitación asignada a otro huésped. </p>
                <input   type="checkbox" id="aceptaTerminos" required> Acepto los términos y condiciones
            </label>
            <br>
            <di class="flex justify-center"> 
                <button type="submit" class="bg-orange-300 rounded-lg p-1 m-1 hover:bg-orange-600 text-black m-4">Reservar</button>
            </div>
           
        </form>
    `;
    container.appendChild(reservation);

    const form = document.getElementById("formu-reservation");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaFin = document.getElementById("fechaFin").value;

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            alert("La fecha de salida debe ser mayor a la de ingreso.");
            return;
        }

        const data = {
            inicio: fechaInicio,
            fin: fechaFin,
            clienteId: 1,
        };

        actualizarReserva(roomID, [...reservasActuales, data]);
    });
}

// Actualizar la reserva en el servidor
function actualizarReserva(roomID, nuevasReservas) {
    fetch(`https://serverhotel-jnf0.onrender.com/rooms/${roomID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservas: nuevasReservas }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al guardar los datos");
            }
            return response.json();
        })
        .then((updatedData) => {
            alert("Reserva realizada con éxito.");
            console.log("Datos actualizados:", updatedData);
        })
        .catch((error) => {
            console.error("Error en la operación:", error);
        });
}


//-----------------menu 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Cambiar la visibilidad del menú
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});
