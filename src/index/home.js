// llamar elementos
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const antImg = document.getElementById("AnteriorvBtn");
const sigImg = document.getElementById("SiguientetBtn");
//  iniciar con la primera img
let actualImg = 1;
//funcion para mostrar imagenes 
function mostrarImg(){
    if(actualImg === 1){
        img1.classList.remove("hidden");
        img2.classList.add("hidden");
    }else{
        img1.classList.add("hidden");
        img2.classList.remove("hidden");
    }
}

//funciones para ir al siguente img
 function siguenteimg(){
    actualImg = (actualImg === 1) ? 2: 1;
    mostrarImg();
}
//funcion para ir a la anterior img
function anteriorimg(){
    actualImg = (actualImg === 1) ? 2: 1;
    mostrarImg()
}
//eventos que escuchan los botones
sigImg.addEventListener("click", siguenteimg);
antImg.addEventListener("click", anteriorimg)

mostrarImg();

//-----------------menu 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
//-------------------------------------- agregar al catalogo las habitaciones
let habitaciones = document.getElementById("catalogo");
habitaciones.style.display = "grid";
habitaciones.style.gridTemplateColumns = "repeat(2, 1fr)";
habitaciones.style.gap = "10px";

fetch("http://localhost:3000/rooms")
.then(response => response.json())
.then(data => {
    data.rooms.forEach(element => {
        // Crear un div para la habitación
        const habitacion = document.createElement("div");
        habitacion.classList.add("habitacion", "border", "p-4", "m-4", "bg-rose-200", "w-80", "h-80");

        // Añadir contenido a la habitación
        habitacion.innerHTML = `
            <img src="${element.imagenes.habitacion}" alt="Imagen de la habitación" style="width: 100%; height: auto;">
            <h2>${element.name}</h2>
            <p>Número de camas: ${element.NumCamas}</p>
            <p>Ubicación: ${element.ubicacion}</p>
            <p>Precio por noche: $${element.precioNoche}</p>
            <p>Estado: ${element.estado}</p>
        `;

        // Añadir la habitación al catálogo
        habitaciones.appendChild(habitacion);
    });
})
.catch(error => console.error('Error:', error));
