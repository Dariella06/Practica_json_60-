interface Empleado {
    id: number;
    nombre: string;
    edad: number;
    puesto: string;
    activo: boolean;
}

let empleados: Empleado[] = [];

const btnActivos = document.getElementById("btn-activos") as HTMLButtonElement;
const btnInactivos = document.getElementById("btn-inactivos") as HTMLButtonElement;
const tbodyEmpleados = document.getElementById("empleados-lista") as HTMLElement;

function validarEmpleado(registro: any): boolean {
    return (
        typeof registro.id === "number" &&
        typeof registro.nombre === "string" &&
        typeof registro.edad === "number" &&
        typeof registro.puesto === "string" &&
        typeof registro.activo === "boolean"
    );
}

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

async function cargarDatos() {
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

btnActivos.onclick = () => mostrarEmpleados(true);
btnInactivos.onclick = () => mostrarEmpleados(false);

document.addEventListener("DOMContentLoaded", cargarDatos);
