const { promises } = require('dns');
const { pool } = require('../config/db');

const produtoModel = {

    /**
     * Retorna todos os recusor cadastrados na tabela produtos
     * 
     * @async
     * @function selectAll
     * @returns {Promise<Array<Object>>} Retorna um arry de objetos, cada objeto representa um produto
     * @example 
     * const produtos = await produtoModel. selectAll();
     * // Saída:
     * [
     *      {coluna1: "valorColuna1", coluna2: "valorColuna2", coluna3: "valorColuna3"},
     *      {coluna1: "valorColuna1", coluna2: "valorColuna2", coluna3: "valorColuna3"},
     * ]
     */
    selectAll: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

   /**
     * Retorna um produto específico com base no seu ID.
     * 
     * @async
     * @function selectById
     * @param {number} pId - ID do produto que deseja buscar.
     * @returns {Promise<Array<Object>>} Retorna um array com o produto encontrado (ou vazio se não existir).
     * @example
     * const produto = await produtoModel.selectById(1);
     * // Saída :
     * // [ { id_produto: 1, nome_produto: "Teclado", valor_produto: 126.25 } ]
     */
    selectById: async (pId) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto=?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * Inserir um novo registro
     * 
     * @param {string} pNomeProd Descrição do nome do produto que deve ser inserido no banco de dados. Ex: Teclado
     * @param {number} pValorProd Valor do proudto que deve ser inserido no banco de dados. Ex: 126.25
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades sobre o resulta da consulta
     * @example
     * const result = await produtoModel.insert(paramA, paramB, ...)
     * // Saida:
     * "result": {
     *      "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 1,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
     * }
     */
    insert: async (pNomeProd, pValorProd) => {
        const sql = 'INSERT INTO produtos(nome_produto, valor_produto) VALUES (?,?);';
        const values = [pNomeProd, pValorProd];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Atualiza os dados de um produto existente.
     * 
     * @async
     * @function update
     * @param {number} pId - ID do produto que será atualizado.
     * @param {string} pDescricao - Novo nome do produto.
     * @param {number} pValor - Novo valor do produto.
     * @returns {Promise<Object>} Retorna um objeto com o resultado da atualização.
     * @example
     * const result = await produtoModel.update(1, "Mouse Gamer", 199.90);
     * // Saída :
     * // {
   		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 0,
		"info": "Rows matched: 1  Changed: 1  Warnings: 0",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 1
     * // }
     */
    update: async (pId, pDescricao, pValor) => {
        const sql = 'UPDATE produtos SET nome_produto=?, valor_produto=? WHERE id_produto=?;';
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Exclui um produto com base no seu ID.
     * 
     * @async
     * @function delete
     * @param {number} pId - ID do produto que será excluído.
     * @returns {Promise<Object>} Retorna um objeto com o resultado da exclusão.
     * @example
     * const result = await produtoModel.delete(2);
     * // Saída :
     * // {
		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 0,
		"info": "",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 0
     * // }
     */
    delete: async (pId) => {
        const sql = 'DELETE FROM produtos WHERE id_produto = ?';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = { produtoModel };