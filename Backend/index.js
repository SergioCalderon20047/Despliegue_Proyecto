const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { error } = require('console');
//npm install bcryptjs
const bcrypt = require('bcryptjs');


const app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})
const port = 5000;

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Proyecto'
});

// Conectar a MySQL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS después de la inicialización de app
app.use(cors());


// Ruta para registrar un usuario
app.post('/registrar', async (req, res) => {
  console.log('Recibida solicitud de registro:', req.body);
  const { nombre1, nombre2, apellido1, apellido2, tipodoc, Num_Doc, correo, usuario, direccion, local, rol, password } = req.body;

  try {
    // Genera un hash de la contraseña utilizando bcrypt
    const hashContraseña = await bcrypt.hash(password, 10); // 10 es el costo de la encriptación (mayor es más seguro pero más lento)

    // Realiza la inserción en la base de datos con la contraseña encriptada
    const queryString = 'INSERT INTO datos_personales (nombre1, nombre2, apellido1, apellido2, fk_tipo_doc, numero_doc, correo, usuario, Direccion, Num_Local, fk_tipo_rol, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre1, nombre2, apellido1, apellido2, tipodoc, Num_Doc, correo, usuario, direccion, local, rol, hashContraseña];

    db.query(queryString, values, (err, result) => {
      if (err) {
        console.error('Error al registrar usuario en la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Usuario registrado en la base de datos');
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Inicio de sesión
app.post('/autenticar', async (req, res) => {
  const { correo, password, rol } = req.body;

  console.log('Datos recibidos:', { correo, password, rol });

  const query = `SELECT * FROM datos_personales WHERE correo = ? AND fk_tipo_rol = ?`;
  db.query(query, [correo, rol], async (error, results) => {
    if (error) {
      console.error('Error en la autenticación:', error);
      return res.status(500).json({ mensaje: 'Error en la autenticación' });
    }

    console.log('Resultados de la consulta:', results);

    if (results.length > 0) {
      // Verifica la contraseña utilizando bcrypt.compare()
      const usuario = results[0];
      const contraseñaCorrecta = await bcrypt.compare(password, usuario.password);

      if (contraseñaCorrecta) {
        return res.json({ mensaje: 'Autenticación exitosa' });
      } else {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }
    } else {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });
});




app.get('/usuario/:correo', (req, res) => {
  const { correo } = req.params
  console.log(correo)

  const query = `SELECT * FROM Datos_Personales WHERE correo = '${correo}';`
  db.query (query, (error, resultado) => {
      if (error) return console.error (error.message)

      if(resultado.length > 0) {
          res.json(resultado)
      }else{
          res.json ('No hay registros')
      }
  })
})

// Ruta para validar el correo
app.post('/validar-correo', (req, res) => {
  const { correo } = req.body;

  // Consulta a la base de datos para validar el correo
  const query = `SELECT COUNT(*) AS count FROM Datos_Personales WHERE correo = '${correo}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    const count = results[0].count;
    if (count > 0) {
      res.json({ validado: true });
    } else {
      res.json({ validado: false, error: 'El correo no existe en la base de datos' });
    }
  });
});

// Ruta para cambiar la contraseña
const saltRounds = 10; // Número de rondas de sal para bcrypt

app.post('/cambiar-contrasena', (req, res) => {
  const { correo, contrasena } = req.body;

  // Generar un hash de la contraseña
  bcrypt.hash(contrasena, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error al cifrar la contraseña:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Actualizar la contraseña en la base de datos con el hash generado
    const query = `UPDATE Datos_Personales SET password = '${hash}' WHERE correo = '${correo}'`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al actualizar la contraseña:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      if (results.affectedRows > 0) {
        res.json({ cambioExitoso: true });
      } else {
        res.json({ cambioExitoso: false, error: 'El correo no existe en la base de datos' });
      }
    });
  });
});



app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'imagenes');
    },
    filename: (req, file, callback) => {
        callback(null, `${file.originalname}`);
    }
});

const imagenes = multer({ storage });

app.post('/subir_img', imagenes.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        res.status(400).json({ error: 'No hay archivos' });
        return;
    }

    const filename = file.filename;
    const cleanFilename = filename.replace(/^.*[\\\/]/, '');

    res.json({ filename: cleanFilename });
});



app.put('/usuario_info/:correo', (req, res) => {
  const {correo} = req.params;
  const {nombre1, nombre2, apellido1, apellido2, Direccion, Num_Local, celular} = req.body;
  const cleanFilename = req.body.foto.replace(/^.*[\\\/]/, '');
  const query = `update Datos_Personales set nombre1 = '${nombre1}', nombre2 = '${nombre2}', apellido1 = '${apellido1}', apellido2 = '${apellido2}', Direccion = '${Direccion}', Num_Local = '${Num_Local}', celular = '${celular}', foto = '${cleanFilename}' where correo = '${correo}' ;`
  db.query (query, (error) => {
    if (error) {
      console.error (mensaje.error)
      res.status(500).json({ error: 'Hubo un error al actualizar el cliente' });
            return;
    }
    res.json('Se actualizó correctamente el cliente');
  })
}
)

app.use('/productos', express.static(path.join(__dirname, 'productos')));

const storagep = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'productos');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const productos = multer({ storage: storagep });

app.post('/subir_img_p', productos.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        res.status(400).json({ error: 'No hay archivos' });
        return;
    }

    const filenamep = file.originalname;
    const cleanFilenamep = filenamep.replace(/^.*[\\\/]/, '');

    res.json({ filenamep: cleanFilenamep });
});


//registrar producto
app.post('/registrar-producto', (req, res) => {
    const { Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, Url_Imagen, Estado} = req.body;
    const cleanFilenamep = Url_Imagen.replace(/^.*[\\\/]/, '');
    const query = `INSERT INTO Productos (Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, Url_Imagen, Estado) VALUES (?, ?, ?, ?, ?, ?, 1)`;
    const values = [Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, cleanFilenamep, Estado];
    db.query(query, values, (error) => { 
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json('se inserto correctamente');
    });
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Productos WHERE Id_Producto = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('error al mostrar', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        } 

        if (result.length > 0) {
            res.json(result);
        } else {
            res.json('no hay resultados');
        }
    });
});


//actualiza los productos
app.put('/productos_actualizar/:id', (req, res) => {
  const {id} = req.params
  const { Nombre_Producto, Descripcion, Cantidad, Id_Peso, Id_Categoria, Url_Imagen} = req.body;
  const cleanFilenamep = Url_Imagen.replace(/^.*[\\\/]/, ''); 
  const query = `UPDATE Productos SET Id_Peso=${Id_Peso}, Id_Categoria=${Id_Categoria}, Nombre_Producto='${Nombre_Producto}', Cantidad=${Cantidad}, Descripcion='${Descripcion}', Url_Imagen = '${cleanFilenamep}' where Id_Producto=${id}`
  db.query(query, (err, result) => {
    if (err) {
      console.error('error al actualizar', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Producto actualizado');
      res.status(200).json('Producto actualizado exitosamente');
    }
  });
});


// Muestra los productos
app.get('/mostrar_producto', (req, res) => {
  // Consulta SQL para seleccionar los productos y sus detalles
  const query = `SELECT Id_Producto, Id_Rol, pesos.Descripcion AS pesodesc, Id_Categoria, Id_Reserva, Nombre_Producto, Cantidad, productos.Descripcion, Url_Imagen, Estado FROM productos INNER JOIN pesos ON productos.Id_Peso = pesos.Id_peso`;
  
  // Ejecutar la consulta en la base de datos
  db.query(query, (error, resultado) => {
    if (error) { // Manejar error si ocurre
      console.error(error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (resultado.length > 0) { // Si se encuentran productos
        res.json(resultado); // Enviar los productos como respuesta
      } else {
        res.status(404).json({ message: 'No se encontraron productos' }); // Enviar un mensaje si no se encontraron productos
      }
    }
  });
});

app.delete('/borrar_produc/:id', (req, res) => {
  const {id} = req.params;

  const query = `UPDATE Productos SET Estado = 0 where Id_Producto = ${id};`;
  db.query (query, (error) => {
    if (error){
      console.error(error.message)
      res.status(500).json({error: 'no se elimino sapa'})
      return;
    }
    res.json('Producto eliminado cabron brrrr')
  })
})


// app.get('/peso_producto/:id', (req, res) => {
//   const {id} = req.params
//   const query = `select * From Pesos where Id_Peso = ${id};`
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error('error al mostrar', err);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     } else {
//       console.log('Peso encontrado');
//       res.status(200).json({ message: 'Peso guardado exitosamente' });
//     }
//   });
// });




app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

db.connect(error => {
  if(error) throw error
  console.log('conectado a la base de datos')
})
