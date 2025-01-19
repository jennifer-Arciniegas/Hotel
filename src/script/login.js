const openLogIn = document.getElementById("abriModal");
const closeLogIbn = document.getElementById("close-modal");
const modal = document.getElementById("login-modal");
const reserva = document.getElementById("reservas")
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
        const response = await fetch(`https://hotelrcarmen.onrender.com/clients?user=${usuario}&password=${contraseña}`)
        const users = await response.json();
        if(users.length >0){
            alert("inicio de sesion exitoso")
            reserva.classList.remove("hidden")
        }else{
            alert("usuario y contraseña no validos")
        }
    }
    catch (error){ console.error("error al iniciar sesion ", error);
        
    }
})