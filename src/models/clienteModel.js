const { promises } = require('dns');
const { pool } = require('../config/db');

const clienteModel = {

    /**
     * Retorna todos os recusor cadastrados na tabela clientes
     * 
     * @async
     * @function selectAll
     * @returns {Promise<Array<Object>>} Retorna um arry de objetos, cada objeto representa um cliente
     * @example 
     * const clientes = await clienteModel.selectAll();
     * // Saída 
     * [
     *      {coluna1: "valorColuna1", coluna2: "valorColuna2", coluna3: "valorColuna3"},
     *      {coluna1: "valorColuna1", coluna2: "valorColuna2", coluna3: "valorColuna3"},
     * ]
     */
    selectAll: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Retorna um cliente específico com base no seu ID.
     * 
     * @async
     * @function selectById
     * @param {number} pId - ID do cliente que deseja buscar.
     * @returns {Promise<Array<Object>>} Retorna um array com o cliente encontrado (ou vazio se não existir).
     * @example
     * const cliente = await clienteModel.selectById(1);
     * // Saída :
     * // [ { id_cliente: 1, nome_cliente: "Ana", cpf_cliente: "12345678900" } ]
     */

    selectById: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente=?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Retorna um cliente com base no CPF informado.
     * 
     * @async
     * @function selectByCpf
     * @param {string} pCpf - CPF do cliente que deseja buscar.
     * @returns {Promise<Array<Object>>} Retorna um array com o cliente encontrado (ou vazio se não existir).
     * @example
     * const cliente = await clienteModel.selectByCpf("12345678900");
     * // Saída :
     * // [ { cpf_cliente: "12345678900" } ]
     */
    selectByCpf: async (pCpf) => {
        const sql = 'SELECT cpf_cliente FROM clientes WHERE cpf_cliente=?;';
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
       * Insere um novo cliente no banco de dados.
       * 
       * @async
       * @function insert
       * @param {string} pNomeCliente - Nome do cliente (exemplo: "Ana").
       * @param {string} pCpfCliente - CPF do cliente (exemplo: "99999999999").
       * @returns {Promise<Object>} Retorna um objeto com informações sobre a operação (ex: insertId, affectedRows).
       * @example
       * const result = await clienteModel.insert("Ana", "99999999999");
       * // Saída:
       * // {
       * //   fieldCount: 0,
       * //   affectedRows: 1,
       * //   insertId: 5,
       * //   info: '',
       * //   serverStatus: 2,
       * //   warningStatus: 0
       * // }
       */
    insert: async (pNomeCliente, pCpfCliente) => {
        const sql = 'INSERT INTO clientes(nome_cliente, cpf_cliente ) VALUES (?,?);';
        const values = [pNomeCliente, pCpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },


    /**
     * Atualiza os dados de um cliente existente no banco.
     * 
     * @async
     * @function update
     * @param {number} pId - ID do cliente que será atualizado.
     * @param {string} pNomeCliente - Novo nome do cliente.
     * @param {string} pCpfCliente - Novo CPF do cliente.
     * @returns {Promise<Object>} Retorna um objeto com informações sobre o resultado da atualização.
     * @example
     * const result = await clienteModel.update(1, "Maria", "11122233344");
     * // :
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
    update: async (pId, pNomeCliente, pCpfCliente) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;';
        const values = [pNomeCliente, pCpfCliente, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Exclui um cliente do banco com base no ID informado.
     * 
     * @async
     * @function delete
     * @param {number} pId - ID do cliente que será excluído.
     * @returns {Promise<Object>} Retorna um objeto com o resultado da exclusão.
     * @example
     * const result = await clienteModel.delete(3);
     * // Saída :
     * // {
     * //"fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
     * // }
     */
    delete: async (pId) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = { clienteModel };