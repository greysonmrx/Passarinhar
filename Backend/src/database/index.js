import Sequelize from 'sequelize';
import mongoose from 'mongoose'

// Models
import User from '../app/models/User';
import Book from '../app/models/Book';
import Gender from '../app/models/Gender';
import Publisher from '../app/models/Publisher';
import Author from '../app/models/Author';
import Rating from '../app/models/Rating';
import File from '../app/models/File'
import Loan from '../app/models/Loan';

// Config database
import databaseConfig from '../config/database';

const models = [User, Book, Gender, Publisher, Author, Rating, File, Loan];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/passarinhar',
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
        );
    }
}

export default new Database();