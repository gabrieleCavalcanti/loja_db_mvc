const { produtoModel } = require('../models/produtoModel');

const produtoController = {

    /**
     * Retorna os produtos cadastrados
     * Rota GET /produtos
     * @async
     * @function selecinaTodos
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array<Object>>} Objeto contendo o resultado da consulta
     */
    selecinaTodos: async (req, res) => {
        try {
            const {idProduto} = req.query

            
            if (idProduto || typeof idProduto == 'number') {
                const resultado = await produtoModel.selectById(idProduto);
                return res.status(200).json({data: resultado})
            } 
            
            const resultado = await produtoModel.selectAll();

            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultado' });
            }
            
            return res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    incluirRegistro: async (req, res) => {
        try {
            const { descricao, valor } = req.body;

            if (!descricao || !valor || !isNaN(descricao) || isNaN(valor)) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await produtoModel.insert(descricao, valor);

            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao iniciar o projeto');
            }

            res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    alterarProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            const { descricao, valor } = req.body;

            if (!idProduto || (!descricao && !valor) || (!isNaN(descricao) && isNaN(valor)) || typeof idProduto != 'number') {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const produtoAtual = await produtoModel.selectById(idProduto);
            if (produtoAtual.length === 0) {
                return res.status(200).json({ message: 'Produto não localizado' })
            }

            // ?? se for nulo
            const novaDescricao = descricao ?? produtoAtual[0].nome_produto;
            const novoValor = valor ?? produtoAtual[0].valor_produto;

            const resulUpdate = await produtoModel.update(idProduto, novaDescricao, novoValor);

            if (resulUpdate.affectedRows === 1 && resulUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            }

            if (resulUpdate.affectedRows === 1 && resulUpdate.changedRows === 1) {
                res.status(200).json({ message: 'Registro alterado com sucesso' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletaProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);

            if (!idProduto || !Number.isInteger(idProduto)) {
                return res.status(400).json({ message: 'Forneça um identificador valido' });
            }

            const produtoSelecionado = await produtoModel.selectById(idProduto);
            if (produtoSelecionado.length === 0) {
                return res.status(200).json({ message: 'Produto não localizadona base de dados' });
            }

            const resultadoDelete = await produtoModel.delete(idProduto);
            if (resultadoDelete.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir o produto' });
            }

            res.status(200).json({ message: 'Produto Excluido com sucesso'});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

module.exports = { produtoController };