import * as Yup from 'yup';

import Gender from '../models/Gender';
import User from '../models/User';

class GenderController {
    async index(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'gender/user-not-authorized'
                });
            }

            const genders = await Gender.findAll();

            return res.status(200).json(genders);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'gender/operation-not-allowed'
            });
        }
    }

    async show(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'gender/user-not-authorized'
                });
            }

            const gender = await Gender.findByPk(req.params.id);

            if (!gender) {
                return res.status(400).json({
                    message: 'Gênero não encontrada!',
                    code: 'gender/gender-not-found'
                });
            }

            return res.status(200).json(gender);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'gender/operation-not-allowed'
            });
        }
    }

    async store(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'gender/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                name: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'gender/validation-fails'
                });
            }

            const gender = await Gender.create(req.body);

            return res.status(200).json(gender);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'gender/operation-not-allowed'
            });
        }
    }

    async update(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'gender/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                name: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'gender/validation-fails'
                });
            }

            const gender = await Gender.findByPk(req.params.id);

            if (!gender) {
                return res.status(400).json({
                    message: 'Gênero não encontrada!',
                    code: 'gender/gender-not-found'
                });
            }

            const { id, name } = await gender.update(req.body);

            return res.status(200).json({ id, name });
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'gender/operation-not-allowed'
            });
        }
    }

    async destroy(req, res) {
        try {
        const currentUser = await User.findByPk(req.userId);

        if (!currentUser.admin) {
            return res.status(401).json({
                message: 'Usuário não autorizado!',
                code: 'gender/user-not-authorized'
            });
        }

        const gender = await Gender.findByPk(req.params.id);

        if (!gender) {
            return res.status(400).json({
                message: 'Autor não encontrado!',
                code: 'gender/gender-not-found'
            });
        }

        await gender.destroy();

        return res.status(200).json();
    } catch(err) {
        return res.status(400).json({
            message: 'Operação indisponível!',
            code: 'gender/operation-not-allowed'
            });
        }
    }
}

export default new GenderController();