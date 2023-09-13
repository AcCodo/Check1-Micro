const repository = require('../repositories/tickets-repository');
const ValidationContract = require('../util/validator');

exports.get = async(req, res, next) => {
    const data = await repository.get();

    if (data.length === 0) {
        res.status(204).send();
        return;
    }

    res.status(200).send(data);
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.titulo, 4, "O título precisa ter no mínimo 4 caracteres");
    contract.hasMinLen(req.body.telefone, 8, "O Telefone precisa ter no mínimo 8 caracteres");
    contract.hasMaxLen(req.body.telefone, 10, "O Telefone precisa ter no máximo 10 caracteres");
    
    

    try {
        if (!contract.isValid()) {
            res.status(400).send({ message: "Erro ao cadastrar as informações. Favor validar" });
            return;
        }

        const data = await repository.create(req.body);
        res.status(201).send("Criado com sucesso");
    } catch (e) {
        res.status(500).send({ message: "Erro inexperado. Entregue esse erro ao adm: " + e });
    }
};

exports.update = async(req, res, next) => {
    const id = req.params.id;
    await repository.update(id, req.body);


    res.status(202).send("Atualizado com sucesso");
};

exports.delete = async(req, res, next) => {
    const id = req.params.id;
    await repository.delete(id);
    res.status(200).send("Deletado com sucesso");
};

exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const data = await repository.getById(id);

    if (data == null || data.length === 0) {
        res.status(204).send();
        return;
    }

    res.status(200).send(data);
};
