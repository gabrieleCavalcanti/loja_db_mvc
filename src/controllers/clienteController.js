const { clienteModel } = require('../models/clienteModel');

const clienteController = {

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
            const { idCliente } = req.query


            if (idCliente || typeof idCliente == 'number') {
                const resultado = await clienteModel.selectById(idCliente);
                return res.status(200).json({ data: resultado })
            }

            const resultado = await clienteModel.selectAll();

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
            const { nome, cpf } = req.body;

            if (!nome || !cpf || !isNaN(nome) || isNaN(cpf)) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const cpfAtual = await clienteModel.selectByCpf(cpf);
            if (cpfAtual.length > 0) {
                return res.status(409).json({ message: 'CPF inválido' })
            }

            const resultado = await clienteModel.insert(nome, cpf);

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
            const idCliente = Number(req.params.idCliente);
            const { nome, cpf } = req.body;

            if (!idCliente || (!nome && !cpf) || (!isNaN(nome) && isNaN(cpf)) || typeof idCliente != 'number') {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const clienteAtual = await clienteModel.selectById(idCliente);
            if (clienteAtual.length === 0) {
                return res.status(200).json({ message: 'Cliente não localizado' })
            }

            const cpfAtual = await clienteModel.selectByCpf(cpf);
            if (cpfAtual.length > 0) {
                return res.status(409).json({ message: 'CPF inválido' })
            }

            // ?? se for nulo
            const novoNome = nome ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;

            const resulUpdate = await clienteModel.update(idCliente, novoNome, novoCpf);

            if (resulUpdate.affectedRows === 1 && resulUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            }

            if (resulUpdate.affectedRows === 1 && resulUpdate.changedRows === 1) {
                res.status(200).json({ message: 'Registro alterado com sucesso'});
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    deletaProduto: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);

            if (!idCliente || !Number.isInteger(idCliente)) {
                return res.status(400).json({ message: 'Forneça um identificador valido' });
            }

            const clienteSelecionado = await clienteModel.selectById(idCliente);
            if (clienteSelecionado.length === 0) {
                return res.status(200).json({ message: 'Produto não localizadona base de dados' });
            }

            const resultadoDelete = await clienteModel.delete(idCliente);
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

module.exports = { clienteController };