const bancodedados = require('../bancodedados');

const depositarEmConta = (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor){
        return res.status(400).json({
        mensagem: 'O número da conta e o valor são obrigatórios!'});
    }
    const numeroContaExistente = bancodedados.contas.find(conta => conta.numero === numero_conta);

    if (!numeroContaExistente) {
      return res.status(404).json({
        mensagem: 'A conta bancária não existe!'});
    }
    if (valor <= 0) {
        return res.status(400).json({
        mensagem: 'Não é permitido deposito de valor negativo ou zerado!'});
    }

    const registroDeDeposito = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    };
    bancodedados.depositos.push(registroDeDeposito);

    numeroContaExistente.saldo += valor

    return res.status(204).end();
};

const realizarSaque = (req, res) => {
    const {numero_conta, valor, senha} = req.body;
    const numeroContaExistente = bancodedados.contas.find(conta => conta.numero === numero_conta);
    
    if (!numero_conta && !valor && !senha) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios.'});
    }
    if (!numeroContaExistente) {
        return res.status(403).json({ mensagem: 'A conta bancária não existe!' });
    } 
    if (valor <= 0){
        return res.status(404).json({ mensagem: 'O valor não pode ser menor que zero!' });  
    }
    if (valor > numeroContaExistente.saldo){
        return res.status(404).json({ mensagem: 'Não há saldo suficiente para saque!' });  
    }
    if (senha !== numeroContaExistente.usuario.senha) {
        return res.status(403).json({ mensagem: 'A senha informada não é válida!' });
    }

    const registroDeSaque = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    };
    numeroContaExistente.saldo -= valor
    bancodedados.saques.push(registroDeSaque);

    return res.status(200).end();
};

const realizarTransferencia = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    if(!numero_conta_origem && !numero_conta_destino && !valor && !senha){
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios.'});       
    }
    const numeroContaOrigem = bancodedados.contas.find(conta => conta.numero === numero_conta_origem);
    const numeroContaDestino = bancodedados.contas.find(conta => conta.numero === numero_conta_destino);
  
    if (!numeroContaOrigem || !numeroContaDestino) {
      return res.status(404).json({ mensagem: 'Uma das contas bancárias não existe!' });
    }
    if (senha !== numeroContaOrigem.usuario.senha) {
        return res.status(403).json({ mensagem: 'A senha informada não é válida!' });
    }
    if (valor > numeroContaOrigem.saldo){
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }
    const dataDaTranferencia = new Date().toLocaleString();

    const registroDaTransferenciaDeOrigem = {
        data: dataDaTranferencia,
        numero_conta_origem,
        numero_conta_destino,
        valor: -valor
    };
    const registroDaTransferenciaDeDestino = {
        data: dataDaTranferencia,
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    bancodedados.transferencias.push(registroDaTransferenciaDeOrigem, registroDaTransferenciaDeDestino);

    numeroContaOrigem.saldo -= valor;
    numeroContaDestino.saldo +=valor;

    res.status(204).end();
};



module.exports = {
    depositarEmConta,
    realizarSaque,
    realizarTransferencia
};
