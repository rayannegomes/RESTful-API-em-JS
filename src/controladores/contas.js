const bancodedados = require('../bancodedados');


const listarContas = (req, res) => {
  const senhaBanco = req.query.senha_banco;
  const contas = bancodedados.contas;

  if (!senhaBanco) {
    return res.status(400).json({
      mensagem: 'A senha do banco deve ser informada.'});
  }
  if (senhaBanco !== bancodedados.banco.senha) {
    return res.status(401).json({
      mensagem: 'A senha do banco informada é inválida!'});
  }
  if (bancodedados.contas.length === 0) {
    return res.status(204).json([]);
  }

   return res.status(200).json(contas);

};
let proximoNumeroUnico = 1;
const criarContas = (req, res) => {
  const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
  const contaExistenteCpf = bancodedados.contas.find(conta => conta.cpf === cpf);
  const contaExistenteEmail = bancodedados.contas.find(conta => conta.usuario.email === email);

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'});
  }
  if (contaExistenteCpf) {
    return res.status(400).json({
      mensagem: 'Já existe uma conta com o CPF ou e-mail informado.'});
  }
  if (contaExistenteEmail) {
    return res.status(400).json({
      mensagem: 'Já existe uma conta com o CPF ou e-mail informado.'});
  }

  const numeroContaUnico = proximoNumeroUnico.toString();
  proximoNumeroUnico++;

  const novaContaBancaria = {
    numero: numeroContaUnico,
    saldo: 0,
    usuario: {
    nome: nome,
    cpf: cpf,
    data_nascimento: data_nascimento,
    telefone: telefone,
    email: email,
    senha: senha,
  }
};
  bancodedados.contas.push(novaContaBancaria);

  res.status(201).end();
};

const atualizarUsuarioContaBancaria = (req, res) => {
  const numeroConta = req.params.numeroConta;
  const cpfInformado = req.body.cpf;
  const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
  const numeroContaParaAtualizar = bancodedados.contas.find(conta => conta.numero === numeroConta);
  const validarCpf = bancodedados.contas.some(conta => conta.usuario.cpf === cpfInformado);
  const validarEmail = bancodedados.contas.some(conta => conta.usuario.email === email);
  
  if (!numeroContaParaAtualizar){
    return res.status(401).json({
      mensagem: 'O numero de conta informado não existe!'});
  }
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'});
  }
  if (validarCpf){
    return res.status(400).json({
      mensagem: 'O CPF informado já existe cadastrado.'});
  }
  if (validarEmail){
    return res.status(400).json({
      mensagem: 'O E-MAIL informado já existe cadastrado.'});
  }

  numeroContaParaAtualizar.usuario.nome = nome;
  numeroContaParaAtualizar.usuario.cpf = cpf;
  numeroContaParaAtualizar.usuario.data_nascimento = data_nascimento;
  numeroContaParaAtualizar.usuario.telefone = telefone;
  numeroContaParaAtualizar.usuario.email = email;
  numeroContaParaAtualizar.usuario.senha = senha;

  return res.status(204).end();
};

const deletarContaExistente = (req, res) => {
  const numeroConta = req.params.numeroConta;
  const numeroContaParaDeletar = bancodedados.contas.find(conta => conta.numero === numeroConta);
  
  if (!numeroContaParaDeletar){
    return res.status(401).json({
      mensagem: 'O numero de conta informado não existe!'});
  }
  if (numeroContaParaDeletar.saldo !== 0){
    return res.status(400).json({
      mensagem: 'A conta só pode ser removida se o saldo for zero!'});
  }

  bancodedados.contas = bancodedados.contas.filter(conta => conta.numero !== numeroConta);

  res.status(200).end();
};

const solicitarSaldo = (req, res) => {
  const numeroConta = req.query.numero_conta;  
  const senha = req.query.senha;  
  const numeroContaSaldo = bancodedados.contas.find(conta => conta.numero === numeroConta);
  
  if (!numeroContaSaldo){
    return res.status(401).json({
      mensagem: 'Conta bancária não encontada!'});
  }
  if (senha !== numeroContaSaldo.usuario.senha) {
    return res.status(403).json({
      mensagem: 'A senha informada não é válida!'});
  }

  res.status(200).json({saldo: numeroContaSaldo.saldo});

};

const solicitarExtrato = (req, res) => {
  const numeroConta = req.query.numero_conta;
  const senha = req.query.senha;
  const numeroContaExtrato = bancodedados.contas.find(conta => conta.numero === numeroConta);

  if (!numeroContaExtrato) {
    return res.status(404).json({
      mensagem: 'Conta bancária não encontada!'});
  }
  if (senha !== numeroContaExtrato.usuario.senha) {
    return res.status(400).json({
      mensagem: 'A senha informada não é válida!'});
  }

  const depositos = bancodedados.depositos.filter(deposito => deposito.numero_conta === numeroConta);
  const saques = bancodedados.saques.filter(saque => saque.numero_conta === numeroConta);
  const transferenciasEnviadas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numeroConta);
  const transferenciasRecebidas = bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numeroConta);
  
  const extrato = {
    depositos,
    saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };
  return res.status(200).json(extrato);
};

module.exports = {
    listarContas,
    criarContas,
    atualizarUsuarioContaBancaria,
    deletarContaExistente,
    solicitarSaldo,
    solicitarExtrato
};
