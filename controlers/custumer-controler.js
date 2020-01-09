'use strict'

const ValidationContract = require('../validator/validator');
const repository = require('../repository/custumer-repository');
const md5 = require('md5');
const authService = require('../services/auth');

exports.post = async (req, res, next) => {

  let contract = new ValidationContract();

  contract.hasMinLen(req.body.fullname, 10, 'Seu nome deve conter mais de 10 caracteres não é?');
  contract.hasMinLen(req.body.nick, 4, 'Seu apelido deve conter mais de 4 caracteres!');
  contract.isEmail(req.body.email, 'Esse email está correto?');
  contract.hasMinLen(req.body.password, 6, 'A Senha deve conter mais de 6 caracteres!');
  contract.isRequired(req.body.cpf, 'A Senha deve conter mais de 6 caracteres!');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return
  }

  try {
    const costumer = await repository.create({
      fullname: req.body.fullname,
      nick: req.body.nick,
      email: req.body.email,
      cpf: req.body.cpf,
      password: md5(req.body.password + global.SALT_KEY)
    })
    const token_auth = await authService.generateToken({
      id: costumer._id,
      email: costumer.email,
      name: costumer.fullname,
      role: costumer.role,
    });

    res.status(201).send({
      message: 'Usuario cadastrado com sucesso!',
      data: costumer,
      token: token_auth,
    });

  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: 'Falha ao cadastrar',
      erro: e
    });
  }

};

exports.put = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const costumer = await repository.update(data.id, req.body);
    res.status(200).send({
      message: 'Atualizado com sucesso!',
      data: costumer
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisiÃ§Ã£o'
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const costumer = await repository.getById(data.id);
    res.status(200).send({
      message: 'Perfil encontrado',
      data: costumer
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisiÃ§Ã£o'
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });
    if (!customer) {
      res.status(404).send({
        message: 'Usuario ou senha invalidos'
      });
      return;
    }
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.fullname,
      role: customer.role
    });
    res.status(201).send({
      token: token,
      data: customer
    });
    return 0;
  } catch (e) {
    console.log('Erro: ', e);
    res.status(500).send({
      message: 'Falha ao processar sua requisiÃ§Ã£o'
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({
        message: 'Cliente nÃ£o encontrado'
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.fullname
    });

    res.status(200).send({
      token: tokenData,
      data: {
        email: customer.email,
        name: customer.fullname,
        role: customer.role,
        id: customer._id
      }
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisiÃ§Ã£o'
    });
  }
};
