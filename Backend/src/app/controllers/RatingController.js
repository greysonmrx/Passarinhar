import Rating from '../models/Rating';
import Book from '../models/Book';
import User from '../models/User';

class RatingController {
    async index(req, res) {
        try {
            const ratings = await Rating.findAll();

            return res.status(200).json(ratings);
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
            const book = await Book.findByPk(req.params.id);

            if (!book) {
                return res.status(400).json({
                    message: 'Livro não encontrado!',
                    code: 'book/book-not-found'
                });
            }

            const ratings = await book.getRatings();

            const arrayRatings = [];

            var can = true;

            if (ratings && ratings.length > 0) {
                ratings.map(({ id, user_id }) => {
                    if (user_id === req.userId) {
                        can = false;
                        
                        return res.status(400).json({
                            message: 'Livro já avaliado!',
                            code: 'rating/book-already-rated'
                        });
                    }

                    arrayRatings[arrayRatings.length] = id;
                });
            }

            if (can) {
                const rating = await Rating.create({
                    user_id: req.userId,
                    ...req.body
                });
    
                arrayRatings[arrayRatings.length] = rating;
    
                book.setRatings(arrayRatings);

                return res.status(200).json(book);
            }            
        } catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }
}

export default new RatingController();