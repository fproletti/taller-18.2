/*let usuarios = [];

 function obtenerDatos() {
    fetch("https://672ce6acfd8979715640a1b8.mockapi.io/users")
    .then(response => response.json())
    .then(data => {
        usuarios = data;
        console.log(usuarios)
       })
    .catch(error => {
        console.error("Error:", error);
    });
}

document.addEventListener('DOMContentLoaded' , () => {

    let contenedorNegro = document.getElementById("results");
 obtenerDatos()

     function  buscarId(){

   
    let valorIngresado = document.getElementById("inputGet1Id").value

    if (valorIngresado ) {
        let usuarioEncontrado = usuarios.find(usuario => usuario.id === valorIngresado);
        console.log(usuarioEncontrado)

    if(usuarioEncontrado) {
        contenedorNegro.innerHTML = JSON.stringify(usuarioEncontrado);

    } else { contenedorNegro.innerHTML = JSON.stringify(usuarios);
    }}
        
 
}

let btnBuscar = document.getElementById("btnGet1");

btnBuscar.addEventListener("click", buscarId()) 

  
});*/

const resultsList = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");
const btnGet1 = document.getElementById("btnGet1");

const url= 'https://672ce6acfd8979715640a1b8.mockapi.io/users'
function listUsuarios() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    resultsList.innerHTML = ""; // Limpiar la lista antes de mostrar los datos
    data.forEach(user => {
    resultsList.innerHTML += `ID: ${user.id}, Nombre: ${user.name}, Apellido: ${user.lastname}`;
    });
    })
    .catch(error => console.error("Error al cargar usuarios:", error));
    }

    function obtenerUsuario(id) {
        fetch(`${url}/${id}`)
            .then(response => response.json())
            .then(data => {
                resultsList.innerHTML = `ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}`;
            })
            .catch(error => console.error("Error al obtener el usuario:", error));
    }

btnGet1.addEventListener("click", () => {
const id = inputGet1Id.value;
if (id) {obtenerUsuario(id)
}else { listUsuarios()};
});

const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const btnAgregar = document.getElementById("btnPost");

function agregarUsuario(nombre, apellido) {
    fetch(url, {
    headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({ nombre, apellido })
})
    .then(response => response.json())
    .then(data => {
        console.log("Usuario agregado:", data);
        listUsuarios();
    })
    .catch(error => console.error("Error al agregar usuario:", error));
}

btnAgregar.addEventListener("click", () => {
    const nombre = inputPostNombre.value;
    const apellido = inputPostApellido.value;
    if (nombre && apellido) agregarUsuario(nombre, apellido);
});


document.addEventListener("DOMContentLoaded", listUsuarios);