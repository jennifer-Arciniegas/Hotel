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



const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

//--------------------------------------
let habitaciones = document.getElementById("catalogo");
habitaciones.style.display = "grid";
habitaciones.style.gridTemplateColumns = "repeat(3, 1fr)";
habitaciones.style.gap = "10px";

fetch("http://localhost:3000/rooms")
.then(response => response.json())
.then(data => {
    data.rooms.forEach(element => {
        const habitacion = document.createElement("div");
        habitacion.classList.add("habitacion", "border 1");
        habitacion.innerHTML = `
        <img src="${element.imagenes.habitacion}"></img>
        <h2>${element.name}</h2>
        <p>${element.NumCamas}</p>
        `;
    })
})
.catch(error => console.error(error));