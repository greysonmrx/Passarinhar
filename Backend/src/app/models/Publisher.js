import Sequelize, { Model } from 'sequelize';

class Publisher extends Model {
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
            through: 'books_publishers',
            as: 'books',
            foreignKey: 'publisher_id'
        });
    }
}

export default Publisher;