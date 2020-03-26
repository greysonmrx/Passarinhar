import Sequelize, { Model } from 'sequelize';

class Book extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            synopsis: Sequelize.TEXT,
            register_quantity: Sequelize.INTEGER,
            available: Sequelize.INTEGER,
        }, {
            sequelize
        });

        this.addHook('beforeCreate', book => {
            if (book.register_quantity) {
                book.available = book.register_quantity;
            }
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Author, {
            through: 'books_authors',
            as: 'authors',
            foreignKey: 'book_id'
        });

        this.belongsToMany(models.Publisher, {
            through: 'books_publishers',
            as: 'publishers',
            foreignKey: 'book_id'
        });

        this.belongsToMany(models.Gender, {
            through: 'books_genders',
            as: 'genders',
            foreignKey: 'book_id'
        });

        this.belongsToMany(models.Rating, {
            through: 'books_ratings',
            as: 'ratings',
            foreignKey: 'book_id'
        });

        this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    }
}

export default Book;