import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
    static init(sequelize) {
        super.init({
            value: Sequelize.INTEGER,
            comment: Sequelize.TEXT
        }, {
            sequelize
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    }
}

export default Rating;