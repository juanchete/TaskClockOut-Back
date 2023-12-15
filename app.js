// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const endpoint1Router = require('./src/routes/stocksEndpoint');
// const endpoint2Router = require('./src/routes/endpoint2');

app.use('/api/endpoint1', endpoint1Router);
// app.use('/endpoint2', endpoint2Router);
// // Endpoint 2
// app.get('/endpoint2', (req, res) => {
//   res.json({ mensaje: 'Hola desde el Endpoint 2' });
// });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});