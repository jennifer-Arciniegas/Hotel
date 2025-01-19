function registerUser(){
    document.getElementById("formRegisterUser").addEventListener("submit", (event)=>{
        event.preventDefault();

        const  formData = {
            user: document.getElementById("user").value,
            password: document.getElementById("password").value,
            nombre: document.getElementById("name").value,
            apellido: document.getElementById("lastName").value,
            email: document.getElementById("email").value
        };
        fetch("https://hotelrcarmen.onrender.com/clients/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(formData)
        })
        .then((Response)=> Response.json())
        .then((data) => {
            window.location.replace("/index.html");

        })
        .catch((error) => alert("error al crear usuario") + error)
    })
}
window.onload = registerUser;
