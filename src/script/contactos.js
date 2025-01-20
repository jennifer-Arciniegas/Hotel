//-----------------menu 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    // Cambiar la visibilidad del menú
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "block" : "none";
});



// Elementos del modal
const openLogInButtons = document.querySelectorAll("#abriModal, #open-modal-mobile"); // Botones para abrir modal
const closeModalButton = document.getElementById("close-modal");
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login");
const registro = document.getElementById("registo")
const reserva = document.getElementById("reservas")
const registroSmall = document.getElementById("regiSmall")
const reservaSmall = document.getElementById("reservaSamall")
// Abrir modal
openLogInButtons.forEach((button) => {
    button.addEventListener("click", () => {
        loginModal.classList.remove("hidden"); // Mostrar modal
        loginModal.style.display = "flex"; // Centrar el modal
    });
});

// Cerrar modal con botón
closeModalButton.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    loginModal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.classList.add("hidden");
        loginModal.style.display = "none";
    }
});

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