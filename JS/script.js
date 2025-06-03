//URL de la api - EndPoint
const API_URL = "https://retoolapi.dev/6AY4mD/expo";

//Función para llamar a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL); //Obtener datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos al JSON a la fúncion "CrearTabla"
}

//Función que creará las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(datos){//Datos representa al JSON qeu viene  de la api
    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vacíamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}

ObtenerPersonas();


//Proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");//Cuadro de diálogo

const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault();//e represemta el evento submit - evitar que el formulario se envie

    //Capturamos los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();

    //Valiación básico
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos");
        return; //Evita que el código siga ejecutándose
    }

    //Llamar a la API para enviarel usuario
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
        //Limpiar formulario
        document.getElementById("frmAgregarIntegrante").reset();

        modal.close();

        ObtenerPersonas();
    }else{
        alert("Hubo un error al agregar")
    }

}); //Fin del formulario

//Para eliminar registros
    async function EliminarRegistro(id){//Se pide el ID para borrar
        if(confirm("¿Está seguro de que desea borrar el registro?")){
            await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
            ObtenerPersonas();
        }
    }