let listaAmigos = [];
let amigosRevelados = [];
const maxAmigos = 10;
const posiblesNombres = ["Laura", "Carlos", "Sofía", "Miguel", "Ana", "Luis", "Valentina", "Daniel", "Pedro", "María"];

function actualizarListaVisual() {
    const ul = document.getElementById("listaVisual");
    ul.innerHTML = "";
    listaAmigos.forEach((amigo, i) => {
        const li = document.createElement("li");
        li.innerText = `${i + 1}. ${amigo}`;
        ul.appendChild(li);
    });
}

function agregarAmigoDesdeUI() {
    const input = document.getElementById("nuevoAmigo");
    const nombre = input.value.trim();

    if (!nombre) return alert("Debes escribir un nombre para añadir.");
    if (listaAmigos.includes(nombre)) return alert("Ese nombre ya está en la lista.");
    if (listaAmigos.length >= maxAmigos) return alert("Ya tienes 10 amigos.");

    listaAmigos.push(nombre);
    input.value = "";
    actualizarListaVisual();
}

function cargarListaPredefinida() {
    listaAmigos = [...posiblesNombres];
    amigosRevelados = [];
    actualizarListaVisual();
}

function completarLista() {
    if (listaAmigos.length < 2) {
        alert("⚠️ Debes agregar al menos 2 amigos para completar la lista.");
        return;
    }

    const faltantes = maxAmigos - listaAmigos.length;
    if (faltantes <= 0) {
        alert("Ya tienes 10 amigos.");
        return;
    }

    const nombresRestantes = posiblesNombres.filter(n => !listaAmigos.includes(n));
    while (listaAmigos.length < maxAmigos && nombresRestantes.length > 0) {
        const indice = Math.floor(Math.random() * nombresRestantes.length);
        listaAmigos.push(nombresRestantes.splice(indice, 1)[0]);
    }

    amigosRevelados = [];
    actualizarListaVisual();
}

function mostrarAmigoSecreto() {
    const resultado = document.getElementById("resultado");
    const disponibles = listaAmigos.filter(n => !amigosRevelados.includes(n));

    if (listaAmigos.length === 0) {
        resultado.innerText = "❗ Primero agrega amigos para sortear.";
        return;
    }

    if (disponibles.length === 0) {
        resultado.innerText = "🎉 Todos los amigos secretos ya fueron revelados.";
        return;
    }

    const indice = Math.floor(Math.random() * disponibles.length);
    const amigo = disponibles[indice];
    amigosRevelados.push(amigo);

    resultado.innerHTML = `🎁 Tu amigo secreto es: <span class="neon-nombre">${amigo}</span>`;
}

function reiniciarJuego() {
    listaAmigos = [];
    amigosRevelados = [];
    document.getElementById("nuevoAmigo").value = "";
    document.getElementById("resultado").innerText = "";
    actualizarListaVisual();
}

window.onload = function () {
    document.getElementById("tituloJuego").innerText = "🎮 Sorteo del Amigo Secreto";
    document.getElementById("subtituloJuego").innerText = "Agrega nombres o carga una lista. Luego presiona el botón para revelar un amigo secreto al azar.";
    actualizarListaVisual();
};
