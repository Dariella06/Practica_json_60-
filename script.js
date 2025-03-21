var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Aquí creo un array global donde voy a almacenar todos los empleados.
 * (Este array contendrá objetos de tipo Empleado)
 */
var empleados = [];
/**
 * Este botón me permite mostrar solo los empleados que están activos.
 * (Obtengo el elemento del DOM que me permitirá interactuar con la interfaz)
 */
var btnActivos = document.getElementById("btn-activos");
/**
 * Con este botón puedo ver los empleados que están inactivos.
 * (Obtengo otro elemento del DOM para cambiar la visualización de los empleados)
 */
var btnInactivos = document.getElementById("btn-inactivos");
/**
 * Este elemento HTML es donde voy a renderizar la lista de empleados.
 * (Especifico el lugar en el DOM donde se mostrará la información de los empleados)
 */
var tbodyEmpleados = document.getElementById("empleados-lista");
/**
 * Esta función valida que un objeto cumpla con la estructura que definí en la interfaz Empleado.
 * (Me aseguro de que los datos que recibo tengan el formato correcto)
 * Tipos de funciones utilizadas: Funciones anónimas (arrow functions) para la validación.
 * Dificultad: Básica, ya que solo compruebo tipos de datos.
 *
 * @param registro - El objeto que quiero validar.
 * @returns {boolean} Retorna true si el objeto cumple con la estructura, false en caso contrario.
 */
function validarEmpleado(registro) {
    return (typeof registro.id === "number" &&
        typeof registro.nombre === "string" &&
        typeof registro.edad === "number" &&
        typeof registro.puesto === "string" &&
        typeof registro.activo === "boolean");
}
/**
 * Aquí elimino los duplicados de la lista de empleados basándome en el 'id'.
 * (Utilizo un Set para llevar un registro de los IDs que ya he visto)
 * Tipos de funciones utilizadas: Funciones anónimas (arrow functions) con filter.
 * Dificultad: Media, ya que implica el uso de un Set y la lógica para filtrar duplicados.
 *
 * @param lista - El array de empleados que quiero procesar.
 * @returns {Empleado[]} Un nuevo array sin duplicados.
 */
function eliminarDuplicados(lista) {
    var idsVistos = new Set();
    var idsEliminados = [];
    var listaSinDuplicados = lista.filter(function (emp) {
        if (idsVistos.has(emp.id)) {
            idsEliminados.push(emp.id);
            return false;
        }
        idsVistos.add(emp.id);
        return true;
    });
    if (idsEliminados.length > 0) {
        console.log("IDs eliminados por duplicados:", idsEliminados);
    }
    else {
        console.log("No se encontraron empleados duplicados.");
    }
    return listaSinDuplicados;
}
/**
 * Esta función me muestra los empleados en la interfaz según si están activos o inactivos.
 * (Filtra la lista de empleados y actualiza el DOM para mostrar la información)
 * Tipos de funciones utilizadas: Funciones anónimas (arrow functions) con filter y map.
 * Dificultad: Básica, ya que combina operaciones de array con manipulación del DOM.
 *
 * @param activos - Un booleano que indica si quiero mostrar empleados activos (true) o inactivos (false).
 */
function mostrarEmpleados(activos) {
    var empleadosFiltrados = empleados.filter(function (emp) { return emp.activo === activos; });
    tbodyEmpleados.innerHTML = "";
    empleadosFiltrados.map(function (emp) {
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>".concat(emp.id, "</td>\n                          <td>").concat(emp.nombre, "</td>\n                          <td>").concat(emp.edad, "</td>\n                          <td>").concat(emp.puesto, "</td>\n                          <td>").concat(emp.activo ? "Activo" : "Inactivo", "</td>");
        tbodyEmpleados.appendChild(fila);
    });
}
/**
 * Aquí cargo los datos de los empleados desde dos archivos JSON de manera secuencial.
 * (Utilizo fetch para obtener los datos y los combino en un solo array)
 * Tipos de funciones utilizadas: Funciones asíncronas (async/await) para manejar la carga de datos.
 * Dificultad: Media, ya que implica la gestión de operaciones asíncronas y la validación de datos.
 *
 * @returns {Promise<void>} Una promesa que se resuelve cuando la carga y el procesamiento de datos han finalizado.
 */
function cargarDatos() {
    return __awaiter(this, void 0, void 0, function () {
        var respuesta1, datos1, respuesta2, datos2, datosCombinados, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("data1.json")];
                case 1:
                    respuesta1 = _a.sent();
                    return [4 /*yield*/, respuesta1.json()];
                case 2:
                    datos1 = _a.sent();
                    return [4 /*yield*/, fetch("data2.json")];
                case 3:
                    respuesta2 = _a.sent();
                    return [4 /*yield*/, respuesta2.json()];
                case 4:
                    datos2 = _a.sent();
                    datosCombinados = __spreadArray(__spreadArray([], datos1, true), datos2, true);
                    empleados = eliminarDuplicados(datosCombinados.filter(validarEmpleado));
                    mostrarEmpleados(true);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error al cargar los datos:", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Aquí asigno los eventos a los botones para cambiar la visualización de los empleados.
 * (Defino qué sucede cuando el usuario hace clic en los botones)
 */
btnActivos.onclick = function () { return mostrarEmpleados(true); };
btnInactivos.onclick = function () { return mostrarEmpleados(false); };
/**
 * Finalmente, inicio la carga de datos cuando el documento HTML está completamente cargado.
 * (Aseguro que la aplicación comience a funcionar una vez que el DOM esté listo)
 */
document.addEventListener("DOMContentLoaded", cargarDatos);
