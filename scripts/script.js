const url= 'https://672ce6acfd8979715640a1b8.mockapi.io/users'

let usuarios = [];

// contenedores
let resultsList = document.getElementById("results");
let alertPlaceholder = document.getElementById('liveAlertPlaceholder');

//inputs
let inputGet1Id = document.getElementById("inputGet1Id");
let inputPostNombre = document.getElementById("inputPostNombre");
let inputPostApellido = document.getElementById("inputPostApellido");
let inputPutId = document.getElementById("inputPutId");
let inputPutNombre = document.getElementById("inputPutNombre");
let inputPutApellido = document.getElementById("inputPutApellido");
let inputDelete = document.getElementById("inputDelete");

//botones
let btnGet1 = document.getElementById("btnGet1");
let btnPost = document.getElementById("btnPost");
let btnPut = document.getElementById("btnPut");
let btnDelete = document.getElementById("btnDelete");
let btnSendChanges = document.getElementById("btnSendChanges");


function listUsuarios() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usuarios = data;
            console.log(data)
            resultsList.innerHTML = "";
            usuarios.forEach(user => {
                resultsList.innerHTML += `<div> <p> ID: ${user.id},<br> Nombre: ${user.name},<br> Apellido: ${user.lastname}</p></div>`;
            });
        })
        .catch(error => console.error("Error al cargar usuarios:", error));
}


function obtenerUsuario(id) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            resultsList.innerHTML = `<div> <p> ID: ${data.id},<br> Nombre: ${data.name},<br> Apellido: ${data.lastname}</p></div>`;
        })
        .catch(error => console.error("Error al obtener usuario:", error));
}


function agregarUsuario(name, lastname) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, lastname })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuario agregado:", data);
        listUsuarios(); 
    })
    .catch(error => console.error("Error al agregar usuario:", error));
}


function modificarUsuario(id, name, lastname) {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, lastname })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuario modificado:", data);
        listUsuarios(); 
    })
    .catch(error => console.error("Error al modificar usuario:", error));
}


function eliminarUsuario(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuario eliminado:", data);
        listUsuarios(); 
    })
    .catch(error => console.error("Error al eliminar usuario:", error));
}


// alerta de bootstrap
let alert = (message, type) => {
    let wrapper = document.createElement('div')
    wrapper.innerHTML = 
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
  
    alertPlaceholder.append(wrapper);

    setTimeout(() => {
        let alertElement = wrapper.querySelector('.alert');
        if (alertElement) {
            alertElement.classList.remove('show');
            alertElement.classList.add('fade');
        }
        }, 3000);
}


document.addEventListener("DOMContentLoaded", () => {

    // cargar la lista de usuarios
    listUsuarios();


    // eventos de los botones 

    btnGet1.addEventListener("click", () => {
        let id = inputGet1Id.value;

        if (id) {
            obtenerUsuario(id)
        }else listUsuarios();
    });

    btnPost.addEventListener("click", () => {
        let name = inputPostNombre.value;
        let lastname = inputPostApellido.value;

        if (name && lastname) agregarUsuario(name, lastname);
    });

    btnSendChanges.addEventListener("click", () => {
        let id = inputPutId.value;
        let name = inputPutNombre.value;
        let lastname = inputPutApellido.value;

        if (id && name && lastname) modificarUsuario(id, name, lastname);

        let usuarioEncontrado = usuarios.find(usuario => usuario.id === id);
        if (!usuarioEncontrado) {
            alert("Por favor, ingresa un ID valido para modificar.", "danger");
        }

        // Obtener el modal y cerrar después de la actualización
        let modalElement = document.getElementById('dataModal');
        let modal = bootstrap.Modal.getInstance(modalElement);
                
        if (modal) {
            modal.hide();
        }
    });

    btnDelete.addEventListener("click", () => {
        let id = inputDelete.value;

        let usuarioEncontrado = usuarios.find(usuario => usuario.id === id);
        if (!usuarioEncontrado) {
            alert("Por favor, ingresa un ID valido para eliminar.", "danger");
            return;
        } else eliminarUsuario(id);
    });


    // Botones desactivados si no hay valor en los inputs

    [inputPostNombre, inputPostApellido].forEach(input => {
        input.addEventListener("input", () => {
            btnPost.disabled = !(inputPostNombre.value && inputPostApellido.value);
        });
    });

    [inputPutNombre, inputPutApellido].forEach(input => {
        input.addEventListener("input", () => {
            btnSendChanges.disabled = !(inputPutNombre.value && inputPutApellido.value);
        });
    });

    inputPutId.addEventListener("input", () => {
        btnPut.disabled = !inputPutId.value;
    });

    inputDelete.addEventListener("input", () => {
        btnDelete.disabled = !inputDelete.value;
    });
});