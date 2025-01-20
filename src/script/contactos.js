//-----------------menu 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Cambiar la visibilidad del menú
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});


// Manejar el inicio de sesión
// Manejar el inicio de sesión
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar recarga

    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;

    try {
        const response = await fetch(`https://serverhotel-jnf0.onrender.com/clients?user=${username}&password=${password}`);
        const users = await response.json();

        if (users.length > 0) {
            loginModal.classList.add("hidden");
            registro.classList.add("hidden")
            reserva.classList.remove("hidden")
            registroSmall.classList.add("hidden")
            reservaSmall.classList.remove("hidden")
            loginModal.style.display = "none";
            document.getElementById("reservas").classList.remove("hidden"); // Mostrar sección de reservas
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        console.error("Error al iniciar sesión", error);
    }
});