import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            cpf: Sequelize.STRING,
            cep: Sequelize.STRING,
            number: Sequelize.INTEGER,
            complement: Sequelize.STRING,
            public_place: Sequelize.STRING,
            neighborhood: Sequelize.STRING,
            city: Sequelize.STRING,
            state: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
            phone: Sequelize.STRING,
            available: Sequelize.BOOLEAN,
        }, {
            sequelize
        });

        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }            
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;