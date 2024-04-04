const mongoose = require("../config/database");

const schemaProducto = new mongoose.Schema({
    referencia: {
        type: String,
        required: [true,'La referencia es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    precio: {
        type: Number,
        default: [0, 'El precio por defecto es 0'],
        min: [0, 'El precio minimo es cero']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    imagen: {
        type: String,
        Required: [true, 'No existe la imagen o ruta a la imagen por defecto']
    },
    categoria: [{
        id: {
            type: Number,
        },
        nombre: {
            type: String,
        },
        imagen: String
    }]
});

const producto = mongoose.model("producto", schemaProducto);
module.exports = producto;