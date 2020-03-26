import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';

import User from '../models/User';
import Loan from '../models/Loan';
import Book from '../models/Book';
import Rating from '../models/Rating';
import File from '../models/File';

class AdminController {
    async index(req, res) {
        try {
            const { page = 1 } = req.query;

            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'admin/user-not-authorized'
                });
            }

            const loans = await Loan.findAll({
                order: [['createdAt', 'DESC']],
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'date', 'return_date', 'real_return_date', 'delivery_date', 'canceled_at', 'status', 'book_id', 'user_id', 'createdAt'],
                include: [
                    {
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
                    }, {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            });

            return res.status(200).json(loans);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'admin/operation-not-allowed'
            });
        }
    }

    async deliveredBook(req, res) {
        try {
            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'admin/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                loan_id: Yup.number().required(),
                book_id: Yup.number().required(),
                return_date: Yup.date().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação',
                    code: 'admin/validation-fails'
                });
            }

            const { book_id, loan_id, return_date } = req.body;

            const bookIsAvailable = await Book.findByPk(book_id);

            if (!bookIsAvailable) {
                return res.status(400).json({
                    message: 'Livro não encontrado',
                    code: 'admin/book-not-found'
                });
            }

            if (bookIsAvailable.available === 0) {
                return res.status(400).json({
                    message: 'Livro indisponível',
                    code: 'admin/book-not-available'
                });
            }

            const loan = await Loan.findByPk(loan_id);

            if (!loan) {
                return res.status(400).json({
                    message: 'Empréstimo não encontrado',
                    code: 'admin/loan-not-found'
                });
            }

            const hourStart = startOfHour(parseISO(return_date));

            if (isBefore(hourStart, new Date())) {
                return res.status(400).json({
                    message: 'Datas passadas não são permitidas',
                    code: 'admin/past-dates-are-not-permited'
                });
            }

            const updatedLoan = await loan.update({
                status: 'delivered', 
                date: new Date(),
                return_date,
                delivery_date: new Date()
            });

            res.status(200).json(updatedLoan);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'admin/operation-not-allowed'
            });
        }
    }

    async returnedBook(req, res) {
        try {
            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'admin/user-not-authorized'
                });
            }

            const schema = Yup.object().shape({
                loan_id: Yup.number().required(),
                book_id: Yup.number().required()
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({
                    message: 'Falha na validação',
                    code: 'admin/validation-fails'
                });
            }

            const { book_id, loan_id } = req.body;

            const book = await Book.findByPk(book_id);

            if (!book) {
                return res.status(400).json({
                    message: 'Livro não encontrado',
                    code: 'admin/book-not-found'
                });
            }

            const loan = await Loan.findByPk(loan_id);

            if (!loan) {
                return res.status(400).json({
                    message: 'Empréstimo não encontrado',
                    code: 'admin/loan-not-found'
                });
            }

            if (loan.status === 'returned') {
                return res.status(400).json({
                    message: 'Livro já devolvido',
                    code: 'admin/book-already-returned'
                });
            }

            await book.update({
                available: book.available + 1
            });

            const updatedLoan = await loan.update({
                status: 'returned',
                real_return_date: new Date(),
            });

            res.status(200).json(updatedLoan);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'admin/operation-not-allowed'
            });
        }
    }

    async cancelLoan(req, res) {
        try {
            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'admin/user-not-authorized'
                });
            }

            const loan = await Loan.findByPk(req.params.id);

            if (!loan) {
                return res.status(400).json({
                    message: 'Empréstimo não encontrado',
                    code: 'admin/loan-not-found'
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

export default new AdminController();