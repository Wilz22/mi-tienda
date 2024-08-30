const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/routes');

// Crea la aplicación Express
const app = express();

// Configura middlewares
app.use(express.json()); // Para manejar JSON en solicitudes
app.use(cors()); // Para permitir solicitudes de diferentes dominios

// Configura rutas
app.use('/api', taskRoutes); // Rutas para tareas

// Define y arranca el servidor
const PORT = process.env.PORT || 5000; // Usa el puerto de la variable de entorno o 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Mensaje en consola
});
