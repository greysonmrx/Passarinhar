import * as Yup from 'yup';
import { Op } from 'sequelize';

import Loan from '../models/Loan';
import Book from '../models/Book';
import Rating from '../models/Rating';
import File from '../models/File';
import User from '../models/User';

import Notification from '../schemas/Notification';

class LoanController {
    async index(req, res) {
        try {
            const { page = 1 } = req.query;

            const loans = await Loan.findAll({
                where: {
                    user_id: req.userId
                },
                limit: 20,
                offset: (page - 1) * 20,
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'date', 'return_date', 'real_return_date', 'delivery_date', 'canceled_at', 'status', 'book_id', 'createdAt'],
                include: [{
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'name', 'image_id'],
                    include: [
                        {
                            model: Rating,
                            as: 'ratings',
                            attributes: ['id', 'value']
                        }, {
                            model: File,
                            as: 'image',
                            attributes: ['name', 'path', 'url'],
                        }
                    ]
                }]
            });

            return res.status(200).json(loans);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'loan/operation-not-allowed'
            });
        }
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                book_id: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação',
                    code: 'loan/validation-fails'
                });
            }

            const { book_id } = req.body;

            const bookIsAvailable = await Book.findByPk(book_id);

            if (!bookIsAvailable) {
                return res.status(400).json({
                    message: 'Livro não encontrado',
                    code: 'loan/book-not-found'
                });
            }

            if (bookIsAvailable.available === 0) {
                return res.status(400).json({
                    message: 'Livro indisponível',
                    code: 'loan/book-not-available'
                });
            }

            const loans = await Loan.findAll({
                where: {
                    user_id: req.userId,
                    status: { [Op.or]: ['accepted', 'delivered'] }                    
                }
            });

            if (loans && loans.length === 3) {
                return res.status(400).json({
                    message: 'Você pode realizar apenas três empréstimos',
                    code: 'loan/can-only-request-three-loans'
                });
            }

            const loanThatBook = await  Loan.findOne({
                where: {
                    user_id: req.userId,
                    status: { [Op.or]: ['accepted', 'delivered'] },
                    book_id
                }
            });

            if (loanThatBook) {
                return res.status(400).json({
                    message: 'Você já solicitou o empréstimo deste livro',
                    code: 'loan/book-already-requested'
                });
            }

            await bookIsAvailable.update({
                available: bookIsAvailable.available - 1
            });

            const loan = await Loan.create({
                user_id: req.userId, book_id
            });

            const user = await User.findByPk(req.userId);

            await Notification.create({
                content: `Solicitou um novo empréstimo do livro '${bookIsAvailable.name}'`,
                user: user.name
            });

            res.status(200).json(loan);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'loan/operation-not-allowed'
            });
        }
    }

    async cancelLoan(req, res) {
        try {
            const loan = await Loan.findByPk(req.params.id);

            if (!loan) {
                return res.status(400).json({
                    message: 'Empréstimo não encontrado',
                    code: 'admin/loan-not-found'
                });
            }

            if (loan.user_id !== req.userId) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'loan/user-not-authorized'
                });
            }

            const updatedLoan = await loan.update({
                canceled_at: new Date(),
                status: 'canceled'
            });

            return res.status(200).json(updatedLoan);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'admin/operation-not-allowed'
            });
        }
    }
}

export default new LoanController();