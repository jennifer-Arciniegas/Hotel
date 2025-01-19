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
        fetch(`http://localhost:3000/rooms?NumPersonas=${numperso}`)
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
verReservas.addEventListener("click", () =>{

   const tablaR = document.createElement("table")
   tablaR.classList.add("table-auto", "n-4")
   tablaR.innerHTML = `
            <thead class="bg-green-300 "> 
                <th>Habitacion</th>
                <th>Fecha de inicio</th>
                <th>Fecha salida</th>
                <th>Valor por noche</th>
                <th>Valor total</th>
                <th></th>
            </thead>
             <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td> <button class="bg-rose-300 rounded-lg hover:bg-rose-500 p-1 m-1">Cancelar</button></td>
                </tr>
            </tbody>
   `;
    fetch(`http://localhost:3000/rooms/reservas`)

   
   espacioR.appendChild(tablaR)

})


