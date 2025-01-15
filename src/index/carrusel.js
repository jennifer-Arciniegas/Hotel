// llamar elementos
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const antImg = document.getElementById("AnteriorvBtn");
const sigImg = document.getElementById("SiguientetBtn");
//  iniciar con la primera img
let actualImg = 1;
//funcion para mostrar imagenes 
export function mostrarImg(){
    if(actualImg === 1){
        img1.classList.remove("hidden");
        img2.classList.add("hidden");
    }else{
        img1.classList.add("hidden");
        img2.classList.remove("hidden");
    }
}

//funciones para ir al siguente img
export function siguenteimg(){
    actualImg = (actualImg === 1) ? 2: 1;
    mostrarImg();
}
//funcion para ir a la anterior img
export  function anteriorimg(){
    actualImg = (actualImg === 1) ? 2: 1;
    mostrarImg()
}
//eventos que escuchan los botones
sigImg.addEventListener("click", siguenteimg);
antImg.addEventListener("click", anteriorimg)

mostrarImg();




