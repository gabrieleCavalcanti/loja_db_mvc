const express = require('express');
const produtoRoutes = express.Router();
const { produtoController } = require('../controllers/produtoController');

produtoRoutes.get('/produtos', produtoController.selecinaTodos);
produtoRoutes.post('/produtos', produtoController.incluirRegistro);
produtoRoutes.put('/produtos/:idProduto', produtoController.alterarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.deletaProduto);

module.exports = { produtoRoutes };