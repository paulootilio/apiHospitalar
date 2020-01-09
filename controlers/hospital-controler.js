'use strict'

const ValidationContract = require('../validator/validator');
const repository = require('../repository/hospital-repository');
const authService = require('../services/auth');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.isRequired(req.body.name, 'Onde está o nome do hospital?');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return
    }

    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    if (data.role !== 'admin') {
        res.status(400).send({
            message: 'Você não tem autorização para cadastrar hospital'
        });
        return 0;
    }

    try {
        const dados = {
            name: req.body.name,
            status: 'active',
            creator: data.id
        }
        const retorno = await repository.create(dados);
        res.status(201).send({
            message: 'Hospital cadastrado com sucesso!',
            data: retorno,
        });
        return 0;
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'Falha ao cadastrar o hospital',
            erro: error
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        const retorno = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Atualizado com sucesso!',
            data: retorno
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        const retorno = await repository.get(req.params.id);
        res.status(200).send(retorno);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.list = async (req, res, next) => {
    try {
        const retorno = await repository.listAll();
        res.status(200).send(retorno);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};