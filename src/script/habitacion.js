    document.addEventListener("DOMContentLoaded", ()=> {
    // obtener id de la url para usarlo en la peticion fecth
    const urlParams = new URLSearchParams(window.location.search);
    const idroom = urlParams.get("id")

    fetch(`http://localhost:3000/rooms/${idroom}`)
    .then(response => response.json())
    .then( data =>{
        console.log(data)
        // crear elemento para insersion de datos relacinados a la habitacion 
        const espacioRoom = document.getElementById("infoRoom")
        

        //div de informacion
        const room =document.createElement("div")
        room.classList.add("m2", "bg-rose-100", "m-4", "w-80")
        room.innerHTML=`
        <h2> Habitacion: ${data.name} </h2>
        <p> Precio por noche: ${data.precioNoche}</p>
        <ul> 
        <li> numero de personas: ${data.NumPersonas} </li>
        <li> Camas: ${data.NumCamas} </li>
        <li>Ubicacion: ${data.ubicacion} </li>
        </ul>

        <button class="bg-blue-300 rounded-lg m-4 p-2" id="reservarYa">reservar</button>
        `;
        espacioRoom.appendChild(room);
        //-------imagen habitacion

        const imagenRoom = document.getElementById("carruselRoom")
        //div para agregar la img
        const roomIMG = document.createElement("div");
        roomIMG.classList.add("flex", "justify-end")
        roomIMG.innerHTML = `
        <img class="md:w-100"  src="${data.imagenes.habitacion}" alt="Imagen de la habitación" class="w-full h-auto">
        `;
        imagenRoom.appendChild(roomIMG)

            // hacer reserva

        document.getElementById("reservarYa").addEventListener("click", () =>{
            const reservation = document.createElement("div")
            reservation.classList.add("m-4", "bg-green-200")
            // formulario de reserva 
            reservation.innerHTML = `
            <h1> reservando </h1>
            `;
            espacioRoom.appendChild(reservation)
        })


    })
    .catch((error) => console.log("error al consultar en la api"))
    })




