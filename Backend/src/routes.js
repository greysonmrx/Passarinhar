import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PublisherController from './app/controllers/PublisherController';
import BookController from './app/controllers/BookController';
import AuthorController from './app/controllers/AuthorController';
import GenderController from './app/controllers/GenderController';
import RatingController from './app/controllers/RatingController';
import FileController from './app/controllers/FileController';
import LoanController from './app/controllers/LoanController';
import AdminController from './app/controllers/AdminController';
import NotificationController from './app/controllers/NotificationController';

// Middlewares
import AuthMiddleware from './app/middlewares/AuthMiddleware';

// Routes here
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.destroy);

// Publishers
routes.get('/publishers', PublisherController.index);
routes.get('/publishers/:id', PublisherController.show);
routes.post('/publishers', PublisherController.store);
routes.put('/publishers/:id', PublisherController.update);
routes.delete('/publishers/:id', PublisherController.destroy);

// Books
routes.get('/books', BookController.index);
routes.get('/books/byid/:id', BookController.show);
routes.get('/books/byauthor', BookController.searchByAuthor);
routes.get('/books/byname', BookController.searchByName);
routes.get('/books/bygender', BookController.searchByGender);
routes.get('/books/bypublisher', BookController.searchByPublisher);
routes.get('/books/bydate', BookController.searchByDate);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.destroy);

// Authors
routes.get('/authors', AuthorController.index);
routes.get('/authors/:id', AuthorController.show);
routes.post('/authors', AuthorController.store);
routes.put('/authors/:id', AuthorController.update);
routes.delete('/authors/:id', AuthorController.destroy);

// Genders
routes.get('/genders', GenderController.index);
routes.get('/genders/:id', GenderController.show);
routes.post('/genders', GenderController.store);
routes.put('/genders/:id', GenderController.update);
routes.delete('/genders/:id', GenderController.destroy);

// Rating
routes.get('/ratings', RatingController.index);
routes.post('/ratings/:id', RatingController.store);

// Loan
routes.get('/loans', LoanController.index);
routes.post('/loans', LoanController.store);
routes.delete('/loans/:id', LoanController.cancelLoan);

// Admin
routes.get('/admin/loans', AdminController.index);
routes.post('/admin/delivery', AdminController.deliveredBook);
routes.post('/admin/return', AdminController.returnedBook);
routes.delete('/admin/cancel/:id', AdminController.cancelLoan);

// Notification
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Files
routes.post('/files', upload.single('file'),FileController.store);

export default routes;