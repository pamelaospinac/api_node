const exp = require('express');
const app = exp()

const logger = require('morgan')
app.use(logger('dev'));

app.use(exp.urlencoded({extended: false}));
app.use(exp.json())

app.listen(process.env.PORT, ( )=>{
    console.log("servidor en linea");
});

let modeloProducto = require('./backend/models/productos.model');

app.get('/productos', async (req, res) => {
    let listadoProductos = await modeloProducto.find();
    if(listadoProductos)
        res.status(200).json(listadoProductos);
    else
        res.status(404).json({error: "No se encontraron productos"});
});

app.get('/productos/:ref', async (req, res)=>{
    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado);
    else
        res.status(404).json({"error": "Producto no encontrado"});
});

app.post('/productos', async(req, res)=>{
    const nuevoProducto = {
        referencia : req.body.referenciaProducto,
        nombre : req.body.nombreProducto,
        precio: req.body.precioProducto,
        descripcion: req.body.descripcionProducto,
        imagen: req.body.imagenProducto,
        categoria: req.body.categoriaProducto,
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if(Insercion)
        res.status(200).json({"Mensaje":"Registro exitoso"})
    else
        res.status(404).json({"Mensaje":"Se presentó un error"})
});

app.put('/producto/:ref', async (req, res)=>{
    const productoEditado = {
        referencia : req.params.ref,
        nombre : req.body.nombreProducto,
        precio: req.body.precioProducto,
        descripcion: req.body.descripcionProducto,
        imagen: req.body.imagenProducto,
        categoria: req.body.categoriaProducto,
    };

    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia:req.params.ref},productoEditado);
    if(Actualizacion)
        res.status(200).json({"Mensaje":"Actualización exitosa"})
    else
        res.status(404).json({"Mensaje":"Se presentó un error"})
});

app.delete('/productos/:id', async (req, res)=>{
    console.log(req.params.id, req.body.referenciaProducto)
    let eliminacion = await modeloProducto.findOneAndDelete({referencia:req.params.id});
    if(eliminacion)
        res.status(200).json({"Mensaje":"Eliminación exitosa"})
    else
        res.status(404).json({"Mensaje":"Se presentó un error"})
});