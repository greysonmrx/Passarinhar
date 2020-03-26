import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async index(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'user/user-not-authorized'
                });
            }

            const users = await User.findAll({
                attributes: [
                    'id', 'name', 'email', 'cpf', 'cep', 'number', 'complement', 
                    'public_place', 'neighborhood', 'city', 'state', 'phone', 'admin', 'available', 'createdAt']
            });

            return res.status(200).json(users);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'user/operation-not-allowed'
            });
        }
    }

    async show(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId, {
                attributes: [
                    'id', 'name', 'email', 'cpf', 'cep', 'number', 'complement', 
                    'public_place', 'neighborhood', 'city', 'state', 'phone', 'admin', 'available']
            });

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'user/user-not-authorized'
                });
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(400).json({
                    message: 'Usuário não encontrado!',
                    code: 'user/user-not-found'
                });
            }

            return res.status(200).json(user);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'user/operation-not-allowed'
            });
        }
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string()
                    .required()
                    .email(),
                password: Yup.string()
                    .required()
                    .min(6),
                cep: Yup.string()
                    .required()
                    .min(8)
                    .max(8),
                neighborhood: Yup.string().required(),
                public_place: Yup.string().required(),
                number: Yup.number()
                    .required()
                    .min(0),
                complement: Yup.string(),
                city: Yup.string().required(),
                state: Yup.string().required(),
                phone: Yup.string()
                    .min(11)
                    .max(11),
                cpf: Yup.string()
                    .required()
                    .min(11)
                    .max(11)
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'user/validation-fails',
                    body: req.body
                });
            }

            const userExistsEmail = await User.findOne({ where: { email: req.body.email }});

            if (userExistsEmail) {
                return res.status(400).json({
                    message: 'Email inválido - Cadastro já existente!',
                    code: 'user/email-already-used'
                });
            }

            const userExistsCpf = await User.findOne({ where: { cpf: req.body.cpf } });

            if (userExistsCpf) {
                return res.status(400).json({
                    message: 'CPF inválido - Cadastro já existente!',
                    code: 'user/cpf-already-used'
                });
            }

            const user = await User.create(req.body);

            return res.status(200).json(user);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'user/operation-not-allowed'
            });
        }
    }

    async update(req, res) {
        try {
            const { email1, oldPassword } =  req.body;

            const user = await User.findByPk(req.userId);

            if (email1 && email1 !== user.email) {
                const userExists = await User.findOne({ where: { email: email1 } });

                if (userExists) {
                    return res.status(400).json({
                        message: 'Email inválido - Cadastro já existente!',
                        code: 'user/email-already-used'
                    });
                }
            }

            if (oldPassword && !(await user.checkPassword(oldPassword))) {
                return res.status(401).json({
                    message: 'Senha incorreta!',
                    code: 'user/invalid-password'
                });
            }

            const { id, name, email, admin, cpf, cep, number, complement, public_place, neighborhood, city, state, phone } = await user.update(req.body);

            return res.status(200).json({ 
                id,
                email, 
                name, 
                admin, 
                cpf, 
                cep, 
                number, 
                complement, 
                public_place, 
                neighborhood, 
                city, 
                state, 
                phone 
            });
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'user/operation-not-allowed'
            });
        }
    }

    async destroy(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'user/user-not-authorized'
                });
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(400).json({
                    message: 'Usuário não encontrado!',
                    code: 'user/user-not-found'
                });
            }

            await user.destroy();

            return res.status(200).json();
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'user/operation-not-allowed'
            });
        }
    }
}

export default new UserController();