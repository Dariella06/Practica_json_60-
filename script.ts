// Declaramos la interfaz para tipar los datos de empleados
interface Empleado {
    id: number;
    nombre: string;
    activo: boolean;
}
  
// Array para almacenar los empleados válidos
let empleados: Empleado[] = [];
  
// Referencias a los elementos del DOM
const btnActivos = document.getElementById('btn-activos') as HTMLButtonElement;
const btnInactivos = document.getElementById('btn-inactivos') as HTMLButtonElement;
const tbodyEmpleados = document.getElementById('empleados-lista') as HTMLElement;
  
// Función para renderizar la tabla con los empleados filtrados
function renderTabla(filtroActivo: boolean) {
  // Filtrar empleados según el valor del parámetro
  const empleadosFiltrados = empleados.filter(emp => emp.activo === filtroActivo);
  
  // Limpiar la tabla
  tbodyEmpleados.innerHTML = '';
  
  // Agregar cada empleado filtrado a la tabla
  empleadosFiltrados.forEach(emp => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${emp.id}</td><td>${emp.nombre}</td><td>${emp.activo ? 'Activo' : 'Inactivo'}</td>`;
    tbodyEmpleados.appendChild(fila);
  });
}
  
// Función para validar cada registro del JSON
function validarEmpleado(registro: any): boolean {
  if (typeof registro.id === 'number' &&
      typeof registro.nombre === 'string' &&
      typeof registro.activo === 'boolean') {
    return true;
  }
  return false;
}
  
// Función para cargar los datos de los dos archivos JSON
async function cargarDatos() {
  try {
    // Se realizan dos peticiones fetch en paralelo
    const [respuesta1, respuesta2] = await Promise.all([
      fetch('data1.json'),
      fetch('data2.json')
    ]);
    
    // Extraemos los datos de cada respuesta
    const datos1 = await respuesta1.json();
    const datos2 = await respuesta2.json();
    
    // Concatenamos los dos arrays en uno solo
    const datosCombinados = [...datos1, ...datos2];
    
    // Validamos y almacenamos solo los registros válidos
    empleados = datosCombinados.filter((registro: any) => {
      if (validarEmpleado(registro)) {
        return true;
      }
      console.warn('Registro inválido:', registro);
      return false;
    });
    
    // Mostrar por defecto los empleados activos
    renderTabla(true);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}
  
// Asignar los eventos a los botones para actualizar la tabla
btnActivos.addEventListener('click', () => renderTabla(true));
btnInactivos.addEventListener('click', () => renderTabla(false));
  
// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarDatos);

