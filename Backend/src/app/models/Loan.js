import Sequelize, { Model } from 'sequelize';

class Loan extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
            delivery_date: Sequelize.DATE,
            real_return_date: Sequelize.DATE,
            return_date: Sequelize.DATE,
            canceled_at: Sequelize.DATE,
            status: Sequelize.STRING
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

        this.belongsTo(models.Book, {
            foreignKey: 'book_id',
            as: 'book'
        });
    }
}

export default Loan;