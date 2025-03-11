//Practica puntuable del 60%
import Ajv from "ajv";
import registros from "./registros.json";

type Empleat = {
    id: number;
    nombre: string;
    edad: number;
    puesto: string[];
    activo: boolean;
};

const puestos = [
    "Desarrollador", 
    "Desarrolladora",
    "Diseñador", 
    "Diseñadora",
    "Responsable formación", 
    "Jefa de proyecto", 
    "Jefe de proyecto",
    "Analista", 
    "Responsable de seguridad"
];

const Esquema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        nombre: { type: "string" },
        edad: { type: "number" },
        puesto: { type: "array", items: { type: "string" } },
        activo: { type: "boolean" }
    },
    required: ["id", "nombre", "edad", "puesto", "activo"]
};

const ajv = new Ajv();

/*
Type Empleat {
    id: Number,
    nombre: String,
    edad: Number,
    puestos: String[],
    activo: String
}*/
