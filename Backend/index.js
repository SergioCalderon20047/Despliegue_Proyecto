const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { error } = require('console');
//npm install bcryptjs
const bcrypt = require('bcryptjs');

const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');


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
  host: 'bgyf8muwlkxkgk4t06p2-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uwhi2ehgq1ymqfax',
  password: 'XW3CEsTF8fKJ3zbC6nnV',
  database: 'bgyf8muwlkxkgk4t06p2'
});

// Conectar a MySQL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Configurar CORS después de la inicialización de app
app.use(cors());

app.get("/", (req,res)=>{res.send("Conectado Correctamente")})

/**
 * @swagger
 * /registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Endpoint para registrar un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre1:
 *                 type: string
 *                 description: Santiago.
 *               nombre2:
 *                 type: string
 *                 description: Segundo nombre del usuario.
 *               apellido1:
 *                 type: string
 *                 description: Primer apellido del usuario.
 *               apellido2:
 *                 type: string
 *                 description: Segundo apellido del usuario.
 *               tipodoc:
 *                 type: string
 *                 description: Tipo de documento del usuario.
 *               Num_Doc:
 *                 type: string
 *                 description: Número de documento del usuario.
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario único.
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario.
 *               local:
 *                 type: string
 *                 description: Número local del usuario.
 *               rol:
 *                 type: string
 *                 description: Rol del usuario en el sistema.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *     responses:
 *       '200':
 *         description: Usuario registrado exitosamente.
 *       '400':
 *         description: Error de validación en los datos de entrada.
 *       '500':
 *         description: Error interno del servidor.
 */

// registrar usuario 
app.post('/registrar', async (req, res) => {
  console.log('Recibida solicitud de registro:', req.body);
  const { nombre1, nombre2, apellido1, apellido2, tipodoc, Num_Doc, correo, usuario, direccion, local, rol, password } = req.body;

  try {
    // Verificar si el correo electrónico tiene formato válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      return res.status(400).json({ error: 'Correo electrónico inválido' });
    }

    // Generar un hash de la contraseña utilizando bcrypt
    const hashContraseña = await bcrypt.hash(password, 10); // 10 es el costo de la encriptación (mayor es más seguro pero más lento)

    // Realizar la inserción en la base de datos con la contraseña encriptada
    const queryString = 'INSERT INTO Datos_Personales (Id_Dato_Personal, nombre1, nombre2, apellido1, apellido2, fk_tipo_doc, correo, usuario, Direccion, Num_Local, fk_tipo_rol, password, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
    const values = [Num_Doc, nombre1, nombre2, apellido1, apellido2, tipodoc, correo, usuario, direccion, local, rol, hashContraseña,];

    db.query(queryString, values, (error, result) => {
      if (error) {
        console.error('Error al registrar usuario en la base de datos:', error);
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

  const query = `SELECT * FROM Datos_Personales WHERE correo = ? AND fk_tipo_rol = ?`;
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
});

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
    res.json('Se actualizó correctamente el usuario');
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
    const {Id_Dato_Personal, Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, Url_Imagen, Estado} = req.body;
    const cleanFilenamep = Url_Imagen.replace(/^.*[\\\/]/, '');
    console.log(Id_Dato_Personal); 
    const query = `INSERT INTO Productos (Id_Dato_Personal, Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, Url_Imagen, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;
    const values = [Id_Dato_Personal, Id_Peso, Id_Categoria, Nombre_Producto, Cantidad, Descripcion, cleanFilenamep, Estado];
    db.query(query, values, (error) => {  
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json('producto publicado');
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
  const query = `SELECT Id_Producto, pesos.Descripcion AS pesodesc, Id_Categoria, Id_Reserva, Nombre_Producto, Cantidad, productos.Descripcion, Url_Imagen, productos.Estado FROM productos INNER JOIN pesos ON productos.Id_Peso = pesos.Id_peso`;
  
  // Ejecutar la consulta en la base de datos
  db.query(query, (error, resultado) => {
    if (error) { // Manejar error si ocurre
      console.error(error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (resultado.length > 0) { 
        res.json(resultado); 
      } else {
        res.status(404).json({ message: 'No se encontraron productos' }); // Enviar un mensaje si no se encontraron productos
      }
    }
  });
});

app.get('/mostrar_producto/:correo_usuario', (req, res) => {
  const {correo_usuario} = req.params
  console.log(correo_usuario)
  const query = `SELECT Id_Producto, correo,pesos.Descripcion AS pesodesc, Id_Categoria, Id_Reserva, Nombre_Producto, Cantidad, productos.Descripcion, Url_Imagen, productos.Estado FROM productos INNER JOIN pesos ON productos.Id_Peso = pesos.Id_peso INNER JOIN datos_personales on datos_personales.Id_Dato_Personal = productos.Id_Dato_Personal WHERE correo = '${correo_usuario}'`

  db.query(query, (error, resultado) => {
    if (error) return console.error(error.message)
    if (resultado.length > 0) {
      res.json(resultado)
  }
  else {res.json('no se encuentra el producto')}
})
});

app.get('/mostrar_producto', (req, res) => {
  const {} = req.params
  console.log()
  const query = `SELECT * FROM Productos`

  db.query(query, (error, resultado) => {
    if (error) return console.error(error.message)
    
      res.json(resultado)
})
});

app.delete('/borrar_produc/:id', (req, res) => {
  const {id} = req.params;

  const query = `UPDATE Productos SET Estado = 0 where Id_Producto = ${id};`;
  db.query (query, (error) => {
    if (error){
      console.error(error.message)
      res.status(500).json({error: 'no se elimino'})
      return;
    }
    res.json('Producto eliminado')
  })
})


app.get('/datos', (req, res) => {
  const query = 'SELECT * FROM Datos_Personales';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/datos/:id', (req, res) => {
  const {id} = req.params
  const query = `SELECT * FROM Datos_Personales where Id_Dato_Personal = ${id}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});


app.put('/actualizar_datos/:id', (req, res) => {
  const { id } = req.params;
  const { fk_tipo_rol, nombre1, nombre2, apellido1, apellido2, Id_Dato_Personal, correo, estado } = req.body;

  const query = `
    UPDATE Datos_Personales
    SET fk_tipo_rol = '${fk_tipo_rol}' ,nombre1 = '${nombre1}', nombre2 = '${nombre2}', apellido1 = '${apellido1}',
        apellido2 = '${apellido2}', Id_Dato_Personal = '${Id_Dato_Personal}', correo = '${correo}',
        estado = '${estado}'
    WHERE Id_Dato_Personal = ${id}
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al actualizar los datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});


app.get('/rol', (req, res) => {
  const query = `SELECT * FROM roles`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});


app.get('/datos_info/cliente', (req, res) => {
  const query = 'SELECT * FROM Datos_Personales where fk_tipo_rol = 3';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});


app.get('/datos_info/proveedor', (req, res) => {
  const query = 'SELECT * FROM Datos_Personales where fk_tipo_rol = 2';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});


app.get('/productos/fruta', (req, res) => {
  const query = 'SELECT * FROM Productos where Id_Categoria = 1';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/productos/verdura', (req, res) => {
  const query = 'SELECT * FROM Productos where Id_Categoria = 2';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json(results);
  });
});


app.get('/datos/producto/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
        p.Id_Producto, 
        pes.Descripcion AS pesodesc, 
        p.Id_Categoria, 
        p.Id_Reserva, 
        p.Nombre_Producto, 
        p.Cantidad, 
        p.Descripcion AS producto_desc, 
        p.Url_Imagen, 
        p.Estado,
        dp.*
    FROM 
        productos p 
        INNER JOIN pesos pes ON p.Id_Peso = pes.Id_peso
        INNER JOIN Datos_Personales dp ON p.Id_Dato_Personal = dp.Id_Dato_Personal
    WHERE 
        p.Id_Producto = ${id}`;

  db.query(query, (err, result) => {
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


app.get('/productos/cliente/:id', (req, res) => {
  const { id } = req.params;
  // const query = `SELECT Id_Producto, pesos.Descripcion AS pesodesc, Id_Categoria, Id_Reserva, Nombre_Producto, Cantidad, productos.Descripcion, Url_Imagen, Estado FROM productos INNER JOIN pesos ON productos.Id_Peso = pesos.Id_peso where Id_Producto = ${id}`;
  const query = `SELECT Id_Producto, correo, pesos.Descripcion AS pesodesc, Id_Categoria, Id_Reserva, Nombre_Producto, Cantidad, productos.Descripcion, Url_Imagen, productos.Estado FROM productos INNER JOIN pesos ON productos.Id_Peso = pesos.Id_peso INNER JOIN datos_personales on datos_personales.Id_Dato_Personal = productos.Id_Dato_Personal WHERE Id_Dato_Personal = '${id}'`
  db.query(query, (err, result) => {
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

app.post('/reservar_producto_usuario', (req, res) => {
  const { Fecha_Inicio, Duracion, Estado } = req.body;

  // Inserta la reserva en la tabla Reservas
  const query = 'INSERT INTO Reservas (Fecha_Inicio, Duracion, Estado) VALUES (?, ?, ?)';
  db.query(query, [Fecha_Inicio, Duracion, Estado], (err, result) => {
    if (err) {
      console.error('Error al reservar el producto:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Producto reservado con éxito');
      res.status(200).json({ message: 'Producto reservado con éxito' });
    }
  }); 
});





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

app.get('/usuario_info/:correo', (req, res) => {
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
});

app.get('/reservas', (req, res) => {
  const query = `SELECT * FROM reservas`;
  db.query(query, (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }
        res.status(200).json(results);
      });
    });

// Endpoint para actualizar una reserva por ID
app.put('/reservas/:id', (req, res) => {
  const id = req.params.id;
  const estado = req.body.Estado; // Suponiendo que el estado se envía en el cuerpo de la solicitud

  console.log(estado);
  console.log(id);


  const sql = `UPDATE reservas SET Estado = ? WHERE Id_Reserva = ?`;
  db.query(sql, [estado, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar reserva:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log('Reserva actualizada correctamente');
    res.status(200).json({ message: 'Reserva actualizada correctamente' });
  });
});

app.get('/productos1/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, ps.Descripcion AS Descripcion, dp.*
    FROM Productos p
    INNER JOIN Pesos ps ON p.Id_Peso = ps.Id_Peso
    INNER JOIN Datos_Personales dp ON p.Id_Dato_Personal = dp.Id_Dato_Personal
    WHERE p.Id_Producto = ?
  `;
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error al mostrar', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
      } 

      if (result.length > 0) {
          res.json(result);
      } else {
          res.json('No hay resultados');
      }
  });
});




app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

db.connect(error => {
  if(error) throw error
  console.log('conectado a la base de datos')
});
