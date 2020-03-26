import * as Yup from 'yup';
import { Op } from 'sequelize';

import Book from '../models/Book';
import Author from '../models/Author';
import Publisher from '../models/Publisher';
import User from '../models/User';
import Gender from '../models/Gender';
import Rating from '../models/Rating';
import File from '../models/File';

class BookController {
    async index(req, res) {
        try {
            const books = await Book.findAll({
                attributes: ['id', 'name', 'available', 'image_id', 'synopsis', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            return res.status(200).json(books);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async searchByName(req, res) {
        try {
            const { page = 1, name } = req.query;

            const books = await Book.findAll({
                where: { 
                    name: { [Op.substring]: name }
                },
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'name', 'available', 'synopsis', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        attributes: ['id', 'value'],
                        through: { attributes: [] }
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (books.length === 0) {
                return res.status(400).json({
                    message: 'Nenhum resultado encontrado!',
                    code: 'book/no-results-founded'
                });
            }

            return res.status(200).json(books);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async searchByAuthor(req, res) {
        try {
            const { page = 1, author_id } = req.query;

            const books = await Book.findAll({
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'name', 'available', 'synopsis', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (books.length === 0) {
                return res.status(400).json({
                    message: 'Nenhum resultado encontrado!',
                    code: 'book/no-results-founded'
                });
            }

            return res.status(200).json(books);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async searchByDate(req, res) {
        try {
            const { page = 1 } = req.query;

            const books = await Book.findAll({
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'name', 'available', 'synopsis', 'createdAt', 'createdAt', 'register_quantity'],
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (books.length === 0) {
                return res.status(400).json({
                    message: 'Nenhum resultado encontrado!',
                    code: 'book/no-results-founded'
                });
            }

            return res.status(200).json(books);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async searchByGender(req, res) {
        try {
            const { page = 1, gender_id } = req.query;

            const books = await Book.findAll({
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'name', 'available', 'synopsis', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (books.length === 0) {
                return res.status(400).json({
                    message: 'Nenhum resultado encontrado!',
                    code: 'book/no-results-founded'
                });
            }

            return res.status(200).json(books);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async searchByPublisher(req, res) {
        try {
            const { page = 1, publisher_id } = req.query;

            const books = await Book.findAll({
                limit: 20,
                offset: (page - 1) * 20,
                attributes: ['id', 'name', 'available', 'synopsis', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (books.length === 0) {
                return res.status(400).json({
                    message: 'Nenhum resultado encontrado!',
                    code: 'book/no-results-founded'
                });
            }

            return res.status(200).json(books);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async show(req, res) {
        try {
            const book = await Book.findByPk(req.params.id, {
                attributes: ['id', 'name', 'synopsis', 'register_quantity', 'available', 'createdAt', 'register_quantity'],
                include: [
                    {
                        model: Author,
                        as: 'authors',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Publisher,
                        as: 'publishers',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Gender,
                        as: 'genders',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }, {
                        model: Rating,
                        as: 'ratings',
                        through: { attributes: [] },
                        attributes: ['id', 'value', 'comment', 'user_id', 'createdAt'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }, {
                        model: File,
                        as: 'image',
                        attributes: ['name', 'path', 'url']
                    }
                ]
            });

            if (!book) {
                return res.status(400).json({
                    message: 'Livro não encontrado!',
                    code: 'book/book-not-found'
                });
            }

            return res.status(200).json(book);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async store(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'book/user-not-authorized'
                });
            }

            const { authors, publishers, genders, ...data } = req.body;

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                register_quantity: Yup.number()
                    .required()
                    .min(0),
                synopsis: Yup.string().required()
            });

            if (!(await schema.isValid(data))) {
                return res.status(400).json({
                    message: 'Falha na validação!',
                    code: 'book/validation-fails'
                });
            }            

            const book = await Book.create(data);

            if (authors && authors.length > 0) {
                book.setAuthors(authors);
            }

            if (publishers && publishers.length > 0) {
                book.setPublishers(publishers);
            }

            if (genders && genders.length > 0) {
                book.setGenders(genders);
            }

            book.setRatings([1, 2]);

            return res.status(200).json(book);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async update(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'book/user-not-authorized'
                });
            }

            const book = await Book.findByPk(req.params.id);

            if (!book) {
                return res.status(400).json({
                    message: 'Livro não encontrado!',
                    code: 'book/book-not-found'
                });
            }

            const { authors, publishers, genders, ...data } = req.body;

            if (authors && authors.length > 0) {
                book.setAuthors(authors);
            }

            if (publishers && publishers.length > 0) {
                book.setPublishers(publishers);
            }

            if (genders && genders.length > 0) {
                book.setGenders(genders);
            }

            const bookUpdated = await book.update(data);

            return res.status(200).json(bookUpdated);
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }

    async destroy(req, res) {
        try {
            const currentUser = await User.findByPk(req.userId);

            if (!currentUser.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'book/user-not-authorized'
                });
            }

            const book = await Book.findByPk(req.params.id);

            if (!book) {
                return res.status(400).json({
                    message: 'Livro não encontrado!',
                    code: 'book/book-not-found'
                });
            }

            await book.destroy();

            return res.status(200).json();
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }
}

export default new BookController();