import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required()
                    .email(),
                password: Yup.string()
                    .required()
                    .min(6)
            });

            if (!(await schema.isValid({ email, password }))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'session/validation-fails'
                });
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({
                    message: 'Usuário não encontrado!',
                    code: 'session/user-not-found'
                });
            }

            if (!(await user.checkPassword(password))) {
                return res.status(401).json({
                    message: 'Senha inválida!',
                    code: 'session/password-does-not-match'
                });
            }

            const { id, name, admin, cpf, cep, number, complement, public_place, neighborhood, city, state, phone } = user;

            return res.status(200).json({
                user: { id, name, email, admin, cpf, cep, number, complement, public_place, neighborhood, city, state, phone },
                token: jwt.sign({ id }, auth.secret, {
                    expiresIn: auth.expiresIn
                })
            });
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'session/operation-not-allowed'
            });
        }
    }
}

export default new SessionController();