import * as Yup from 'yup';

import Publisher from '../models/Publisher';
import User from '../models/User';

class PublisherController {
    async index(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'publisher/user-not-authorized'
                });
            }

            const publishers = await Publisher.findAll();

            return res.status(200).json(publishers);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'publisher/operation-not-allowed'
            });
        }
    }

    async show(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'publisher/user-not-authorized'
                });
            }

            const publisher = await Publisher.findByPk(req.params.id);

            if (!publisher) {
                return res.status(400).json({
                    message: 'Editora não encontrada!',
                    code: 'publisher/publisher-not-found'
                });
            }

            return res.status(200).json(publisher);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'publisher/operation-not-allowed'
            });
        }
    }

    async store(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'publisher/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                name: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'publisher/validation-fails'
                });
            }

            const publisher = await Publisher.create(req.body);

            return res.status(200).json(publisher);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'publisher/operation-not-allowed'
            });
        }
    }

    async update(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'publisher/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                name: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'publisher/validation-fails'
                });
            }

            const publisher = await Publisher.findByPk(req.params.id);

            if (!publisher) {
                return res.status(400).json({
                    message: 'Editora não encontrada!',
                    code: 'publisher/publisher-not-found'
                });
            }

            const { id, name } = await publisher.update(req.body);

            return res.status(200).json({ id, name });
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'publisher/operation-not-allowed'
            });
        }
    }

    async destroy(req, res) {
        try {
        const currentUser = await User.findByPk(req.userId);

        if (!currentUser.admin) {
            return res.status(401).json({
                message: 'Usuário não autorizado!',
                code: 'publisher/user-not-authorized'
            });
        }

        const publisher = await Publisher.findByPk(req.params.id);

        if (!publisher) {
            return res.status(400).json({
                message: 'Autor não encontrado!',
                code: 'publisher/publisher-not-found'
            });
        }

        await publisher.destroy();

        return res.status(200).json();
    } catch(err) {
        return res.status(400).json({
            message: 'Operação indisponível!',
            code: 'publisher/operation-not-allowed'
            });
        }
    }
}

export default new PublisherController();