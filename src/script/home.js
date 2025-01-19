// Llamar elementos
const images = document.querySelectorAll('.carousel-images .duration-5000'); 
const antImg = document.getElementById("AnteriorvBtn");
const sigImg = document.getElementById("SiguientetBtn");

let actualImg = 0;  // Inicializar en la primera imagen

// Función para mostrar la imagen actual y ocultar las demás
function mostrarImg() {
    // Primero, ocultar todas las imágenes
    images.forEach(img => img.classList.add("hidden"));
    // Luego, mostrar la imagen actual
    images[actualImg].classList.remove("hidden");
}

// Función para ir a la siguiente imagen
function siguienteImg() {
    actualImg = (actualImg + 1) % images.length; 
    mostrarImg();
}

// Función para ir a la imagen anterior
function anteriorImg() {
    actualImg = (actualImg - 1 + images.length) % images.length; 
    mostrarImg();
}

sigImg.addEventListener("click", siguienteImg);
antImg.addEventListener("click", anteriorImg);

// Mostrar la imagen inicial
mostrarImg();

// Autoplay: Cambiar la imagen cada 3 
setInterval(siguienteImg, 3000);

//-----------------menu 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Cambiar la visibilidad del menú
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});

//-------------------------------------- agregar al catalogo las habitaciones
fetch("http://localhost:3000/rooms")
.then(response => response.json())
.then(data => {
    console.log(data);
    data.forEach(element => {
        // Crear un div para la habitación
        const habitacion = document.createElement("div");
        habitacion.classList.add("habitacion", "border", "p-4", "bg-rose-200", "rounded-lg", "w-full", "hover:scale-110", "transition-all", "duration-300");

        // info a la habitación
        habitacion.innerHTML = `
            
            <div class=" flex justify-center m-1 md:w-70 md:h-70  "> <img class="rounded-lg" src="${element.imagenes.habitacion}" alt="Imagen de la habitación" class="w-full h-auto"> </div>
            <h2 class="text-xl font-semibold">${element.name}</h2>
            <p>Número de camas: ${element.NumCamas}</p>
            <p>Ubicación: ${element.ubicacion}</p>
            <p>Precio por noche: $${element.precioNoche}</p>
            <p>Estado: ${element.Disponible}</p>
        `;

        // Añadir la habitación al catálogo
        document.getElementById("catalogo").appendChild(habitacion);
    });
})
.catch(error => console.error('Error:', error));

// --------------------------------------------------------log in 
const openLogIn = document.getElementById("abriModal");
const closeLogIbn = document.getElementById("close-modal");
const modal = document.getElementById("login-modal");
const reserva = document.getElementById("reservas")
const loginisio = document.getElementById("abriModal")
//abiri modal 
openLogIn.addEventListener("click", () =>{
    modal.classList.remove("hidden")
})
// cerrar el moda 
closeLogIbn.addEventListener("click", () => {
    modal.classList.add("hidden")
})

//cerrar si da clik afuera dle modal
modal.addEventListener("click", (event)=>{
    if(event.target === modal){
        modal.classList.add("hidden")
    }
});
document.getElementById("login").addEventListener("submit", async function (event){
    event.preventDefault();//evitar que se recargue la pagina 
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;

    // verificacion con los clientes registrados 
    try{
        // verificar 
        const response = await fetch(`http://localhost:3000/clients?user=${usuario}&password=${contraseña}`)
        const users = await response.json();
        if(users.length >0){
         
            reserva.classList.remove("hidden") //debe funcionar para que vea esa opcion 
            loginisio.classList.add("hidden")
        }else{
            alert("usuario y contraseña no validos")
        }
    }
    catch (error){ console.error("error al iniciar sesion ", error);
        
    }
})

document.addEventListener("DOMContentLoaded", function() {
   
    const carrusel = document.getElementById("carruselComida");
    const items = carrusel.getElementsByClassName("carruselComida-item");
    const AntBTN = document.getElementById("anterioBTN");
    const SigBTN = document.getElementById("siguienteBTN");
    let currentIndex = 0;
    function showItems(index){
        if(index < 0) index = items.length-1;
        if(index >= items.length) index = 0;

        items[currentIndex].classList.remove("active");
        items[index].classList.add("active");
        currentIndex = index;
    }
    AntBTN.addEventListener("click", () => showItems(currentIndex - 1))
    SigBTN.addEventListener("click",() => showItems(currentIndex + 1))
    setInterval(() => showItems(currentIndex + 1), 4000);


    
} );



document.addEventListener("DOMContentLoaded", function() {
    const carruselSerivicio = document.getElementById("carruselServicios");
    const itemServicio = carruselSerivicio.getElementsByClassName("carruselServicios-item");
    const AntBTNServicio = document.getElementById("anterioBTNServicios");
    const SigBTNServicio = document.getElementById("siguienteBTNServicios");
    let currentIndexServicio = 0;

    function showItems(index) {
        if (index < 0) index = itemServicio.length - 1;
        if (index >= itemServicio.length) index = 0;

        itemServicio[currentIndexServicio].classList.remove("active");
        itemServicio[index].classList.add("active");
        currentIndexServicio = index;
    }

    AntBTNServicio.addEventListener("click", () => showItems(currentIndexServicio - 1));
    SigBTNServicio.addEventListener("click", () => showItems(currentIndexServicio + 1));
    setInterval(() => showItems(currentIndexServicio + 1), 4000);
});