'use strict'

const ValidationContract = require('../validator/validator');
const repository = require('../repository/paciente-repository');
const repoLeito = require('../repository/leito-repository');
const authService = require('../services/auth');

exports.post = async (req, res, next) => {

  let contract = new ValidationContract();

  contract.isRequired(req.body.box, 'Onde está o leito/box?');
  contract.isRequired(req.body.name, 'O paciente não tem um nome?');
  contract.isRequired(req.body.idade, 'Qual a idade do paciente?');
  contract.isRequired(req.body.convenio, '');
  contract.isRequired(req.body.hma, '');
  contract.isRequired(req.body.patologias_previas, '');
  contract.isRequired(req.body.hd, '');
  contract.isRequired(req.body.med_em_uso, '');
  contract.isRequired(req.body.data_adm, '');
  contract.isRequired(req.body.atb, '');
  contract.isRequired(req.body.temp, '');
  contract.isRequired(req.body.peso, '');
  contract.isRequired(req.body.fc, '');
  contract.isRequired(req.body.pa, '');
  contract.isRequired(req.body.alergia, '');
  contract.isRequired(req.body.drogas, '');
  contract.isRequired(req.body.plano_terapeutico, '');
  contract.isRequired(req.body.status, '');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return 0;
  }

  try {
    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const base_data = {
        creator: data.id,
        box: req.body.box,
        name: req.body.name,
        idade: req.body.idade,
        convenio: req.body.convenio,
        hma: req.body.hma,
        patologias_previas: req.body.patologias_previas,
        hd: req.body.hd,
        med_em_uso: req.body.med_em_uso,
        data_adm: req.body.data_adm,
        atb: req.body.atb,
        temp: req.body.temp,
        peso: req.body.peso,
        fc: req.body.fc,
        pa: req.body.pa,
        alergia: req.body.alergia,
        drogas: req.body.drogas,
        plano_terapeutico: req.body.plano_terapeutico,
        status: req.body.status,
    }
    const leito = await repoLeito.checkStatus(req.body.box);
    if (leito.status !== 'empty') {
      res.status(400).send({ 
        message: `Falha ao cadastrar, Leito selecionado não está disponivel. ${leito.status}`
      });
      return 0;
    }
    const costumer = await repository.create(base_data);
    if (costumer) {
      await repoLeito.changeStatus(req.body.box);
    }

    res.status(201).send({
      message: 'Paciente cadastrado com sucesso!',
      data: costumer,
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
    const costumer = await repository.update(req.params.id, req.body);
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
exports.list = async (req, res, next) => {
  try {
    const costumers = await repository.list();
    res.status(200).send(costumers);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const costumer = await repository.getById(req.params.id);
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
