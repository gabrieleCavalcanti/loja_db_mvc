const express = require('express');
const clienteRoutes = express.Router();
const { clienteController } = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecinaTodos);
clienteRoutes.post('/clientes', clienteController.incluirRegistro);
clienteRoutes.put('/clientes/:idCliente', clienteController.alterarProduto);
clienteRoutes.delete('/clientes/:idCliente', clienteController.deletaProduto);

module.exports = { clienteRoutes }; 