const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json()); //Para coger el JSON de la petición FETCH que hacemos en el "Login.jsx"
app.use(bodyParser.urlencoded({extended:true})); //Para analizar datos del formulario

const productos = [
    {
        id: 0,
        nombre: 'Collar ajustable',
        precio: 15.99,
        descripcion: 'Collar de nylon ajustable para perros y gatos.',
        img: 'https://mascoboutique.com/14440-superlarge_default/collar-basic-line-rojo-rojo.jpg'
    },
    {
        id: 1,
        nombre: 'Juguete masticable',
        precio: 9.49,
        descripcion: 'Juguete masticable resistente para perros de tamaño mediano.',
        img: 'https://m.media-amazon.com/images/I/61naPb0WjtL._AC_UF894,1000_QL80_.jpg'
    },
    {
        id: 2,
        nombre: 'Cama suave para gatos',
        precio: 24.99,
        descripcion: 'Cama suave y acogedora para gatos, lavable a máquina.',
        img: 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/5905289860084_1.jpg'
    },
    {
        id: 3,
        nombre: 'Bebedero automático',
        precio: 19.99,
        descripcion: 'Bebedero automático con capacidad de 2 litros para perros y gatos.',
        img: 'https://cdn.palbincdn.com/users/36714/images/bebedero-para-perros-cleansy-baja-presion-1625139854.jpg'
    },
    {
        id: 4,
        nombre: 'Rascador de sisal',
        precio: 29.99,
        descripcion: 'Rascador de sisal resistente para gatos, con poste de altura ajustable.',
        img: 'https://m.media-amazon.com/images/I/712oL4ZLuUL._AC_UF894,1000_QL80_.jpg'
    },
];

const usuarios = [{
        nombre: 'Susana', 
        contrasena: 'cualquiera'
    },
    {
        nombre: 'Sara',
        contrasena: 'Sara123',
    },
    {
        nombre: 'Jesús',
        contrasena: 'Mortadelo',
    },
    {
        nombre: 'Noemi',
        contrasena: 'FilemonPi.'
    },
];


// Si hacemos petición POST: app.post. Si hacemos petición GET: app.get
app.post('/', (req,res) => {
    //Para mandar datos de React a Express, utilizamos REQ (request)
    let nombre = req.body.nombre;
    let contrasena = req.body.contrasena;
    let login = false;
    usuarios.forEach((usuarios) => {
        if (usuarios.nombre == nombre && usuarios.contrasena == contrasena) {
            login =true;
        };
    });
    //Para mandar nuestra respuesta de Express a React, utilizamos RES (response)
    if (login == true) {
        res.json({state:'success'})
    } else {
        res.json({state:'failed'})
    };
});

// Productos
app.get('/productos',(req,res) => {
    
    let arrayAuxiliar = productos.map((producto => {
    return {
        id:producto.id,
        nombre:producto.nombre,
        img:producto.img
    }
    }));
    res.json({productos:arrayAuxiliar});
});

//Detalle de productos
app.get('/productos/detalle', (req,res) => {
    let id = req.query.id
    res.json({fichaProducto:productos[id]})
})

//Añadir Producto
app.post('/productos/anadirProducto',(req,res) => {
    let nombre = req.body.nombre;
    let estado = req.body.estado;
    let precio = req.body.precio;
    let descripcion = req.body.descripcion;
    let id = productos.length;

    let objeto = {
        id: id,
        nombre: nombre,
        estado: estado,
        precio: parseFloat(precio),
        descripcion: descripcion,
    }

    productos.push(objeto);

    res.redirect('http://localhost:5173/');
})

//Para mostrar en localhost:3000
app.listen(3000,() => { 
    console.log('Servidor encendido');
});