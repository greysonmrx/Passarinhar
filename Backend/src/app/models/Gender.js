import Sequelize, { Model } from 'sequelize';

class Gender extends Model {
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
            through: 'books_genders',
            as: 'books',
            foreignKey: 'gender_id'
        });
    }
}

export default Gender;