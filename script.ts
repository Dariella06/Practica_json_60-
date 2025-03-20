/**
 * En esta interfaz, defino la estructura que tendrá un empleado.
 * Especifico los tipos de datos que cada propiedad del empleado debe tener
 */
interface Empleado {
    id: number;
    nombre: string;
    edad: number;
    puesto: string;
    activo: boolean;
}


//Aquí creo un array global donde voy a almacenar todos los empleados.

let empleados: Empleado[] = [];


//Este botón me permite mostrar solo los empleados que están activos.
 
const btnActivos = document.getElementById("btn-activos") as HTMLButtonElement;

/**
 * Con este botón puedo ver los empleados que están inactivos.
 * Obtengo otro elemento para cambiar la visualización de los empleados.
 */
const btnInactivos = document.getElementById("btn-inactivos") as HTMLButtonElement;

//Este elemento HTML es donde voy a renderizar la lista de empleados.

const tbodyEmpleados = document.getElementById("empleados-lista") as HTMLElement;

/**
 * Esta función valida que un objeto cumpla con la estructura que definí en la interfaz Empleado.
 * (También verifica que no haya campos vacíos)
 * Tipos de funciones utilizadas utilizamos: Funciones (arrow functions) para la validación.
 *
 * registro - El objeto que quiero validar.
 * boolean Retorna true si el objeto cumple con la estructura, false en caso contrario.
 */
function validarEmpleado(registro: any): boolean {
    return (
        typeof registro.id === "number" &&
        typeof registro.nombre === "string" &&
        typeof registro.edad === "number" &&
        typeof registro.puesto === "string" &&
        typeof registro.activo === "boolean"
    );
}

/**
 * Aquí elimino los duplicados de la lista de empleados basándome en el 'id'.
 * Utilizamos un Set para llevar un registro de los IDs que ya hemos visto[Set recordatorio de Java]
 * Tipos de funciones utilizamos para avanzadas: Funciones (arrow functions) con filter.
 *
 * lista - El array de empleados que quiero procesar.
 * Empleado[] Un nuevo array sin duplicados.
 */
function eliminarDuplicados(lista: Empleado[]): Empleado[] {
    const idsVistos = new Set<number>();
    const idsEliminados: number[] = [];

    const listaSinDuplicados = lista.filter(emp => {
        if (idsVistos.has(emp.id)) {
            idsEliminados.push(emp.id);
            return false;
        }
        idsVistos.add(emp.id);
        return true;
    });

    if (idsEliminados.length > 0) {
        console.log("IDs eliminados por duplicados:", idsEliminados);
    } else {
        console.log("No se encontraron empleados duplicados.");
    }

    return listaSinDuplicados;
}

/**
 * Esta función me muestra los empleados en la interfaz según si están activos o inactivos.
 * Tipos de funciones utilizadas: Funciones (arrow functions) con filter y map.
 *
 * activos - Un booleano que indica si quiero mostrar empleados activos (true) o inactivos (false).
 */
function mostrarEmpleados(activos: boolean) {
    const empleadosFiltrados = empleados.filter(emp => emp.activo === activos);
    tbodyEmpleados.innerHTML = "";

    empleadosFiltrados.map(emp => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${emp.id}</td>
                          <td>${emp.nombre}</td>
                          <td>${emp.edad}</td>
                          <td>${emp.puesto}</td>
                          <td>${emp.activo ? "Activo" : "Inactivo"}</td>`;
        tbodyEmpleados.appendChild(fila);
    });
}

/**
 * Aquí cargo los datos de los empleados desde dos archivos JSON de manera secuencial.
 * Tipos de funciones utilizadas: Funciones asíncronas (async/await) para manejar la carga de datos.
 * 
 * Promise<void> Una promesa que se resuelve cuando la carga y el procesamiento de datos han finalizado.
 */
async function cargarDatos(): Promise<void> {
    try {
        const respuesta1 = await fetch("data1.json");
        const datos1 = await respuesta1.json();

        const respuesta2 = await fetch("data2.json");
        const datos2 = await respuesta2.json();

        const datosCombinados = [...datos1, ...datos2];

        empleados = eliminarDuplicados(datosCombinados.filter(validarEmpleado));

        mostrarEmpleados(true);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}


//Aquí asigno los eventos a los botones para cambiar la visualización de los empleados.

btnActivos.onclick = () => mostrarEmpleados(true);
btnInactivos.onclick = () => mostrarEmpleados(false);

//Inicio la carga de datos cuando el documento HTML está completamente cargado.
document.addEventListener("DOMContentLoaded", cargarDatos);
