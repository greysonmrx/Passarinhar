import Sequelize, { Model } from 'sequelize';

class Author extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        }, {
            sequelize
        });

        return this;
    }

    static associate(models) {
        this.belongsToMany(models.Book, {
            through: 'books_authors',
            as: 'books',
            foreignKey: 'author_id'
        });
    }
}

export default Author;