const express = require('express');
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', contas.listarContas);
rotas.post('/contas', contas.criarContas);
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuarioContaBancaria);
rotas.delete('/contas/:numeroConta', contas.deletarContaExistente);
rotas.post('/transacoes/depositar', transacoes.depositarEmConta);
rotas.post('/transacoes/sacar', transacoes.realizarSaque);
rotas.post('/transacoes/transferir', transacoes.realizarTransferencia);
rotas.get('/contas/saldo', contas.solicitarSaldo);
rotas.get('/contas/extrato', contas.solicitarExtrato);

module.exports = rotas;
