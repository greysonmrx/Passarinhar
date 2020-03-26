import * as Yup from 'yup';
 
import Author from '../models/Author';
import User from '../models/User';

class AuthorController {
   async index(req, res) {
       try {
           const currentUser = await User.findByPk(req.userId);

           if (!currentUser.admin) {
               return res.status(401).json({
                   message: 'Usuário não autorizado!',
                   code: 'author/user-not-authorized'
               });
           }

           const authors = await Author.findAll();

           return res.status(200).json(authors);
       } catch(err) {
           return res.status(400).json({
               message: 'Operação indisponível!',
               code: 'author/operation-not-allowed'
           });
       }
   }

   async show(req, res) {
       try {
           const currentUser = await User.findByPk(req.userId);

           if (!currentUser.admin) {
               return res.status(401).json({
                   message: 'Usuário não autorizado!',
                   code: 'author/user-not-authorized'
               });
           }

           const author = await Author.findByPk(req.params.id);

           if (!author) {
               return res.status(400).json({
                   message: 'Autor não encontrado!',
                   code: 'author/author-not-found'
               });
           }

           return res.status(200).json(author);
       } catch(err) {
           return res.status(400).json({
               message: 'Operação indisponível!',
               code: 'author/operation-not-allowed'
           });
       }
   }

   async store(req, res) {
       try {
           const currentUser = await User.findByPk(req.userId);

           if (!currentUser.admin) {
               return res.status(401).json({
                   message: 'Usuário não autorizado!',
                   code: 'author/user-not-authorized'
               });
           }

           const schema = Yup.object().shape({
               name: Yup.string().required()
           });

           if (!(await schema.isValid(req.body))) {
               return res.status(400).json({
                   message: 'Falha na validação!',
                   code: 'author/validation-fails'
               });
           }

           const author = await Author.create(req.body);

           return res.status(200).json(author);
       } catch(err) {
           return res.status(400).json({
               message: 'Operação indisponível!',
               code: 'author/operation-not-allowed'
           });
       }
   }

   async update(req, res) {
       try {
           const currentUser = await User.findByPk(req.userId);

           if (!currentUser.admin) {
               return res.status(401).json({
                   message: 'Usuário não autorizado!',
                   code: 'author/user-not-authorized'
               });
           }

           const schema = Yup.object().shape({
               name: Yup.string().required()
           });

           if (!(await schema.isValid(req.body))) {
               return res.status(400).json({
                   message: 'Falha na validação!',
                   code: 'author/validation-fails'
               });
           }

           const author = await Author.findByPk(req.params.id);

           if (!author) {
               return res.status(400).json({
                   message: 'Autor não encontrado!',
                   code: 'author/author-not-found'
               });
           }

           const { id, name } = await author.update(req.body);

           return res.status(200).json({ id, name });
       } catch(err) {
           return res.status(400).json({
               message: 'Operação indisponível!',
               code: 'author/operation-not-allowed'
           });
       }
   }

   async destroy(req, res) {
       try {
           const currentUser = await User.findByPk(req.userId);

           if (!currentUser.admin) {
               return res.status(401).json({
                   message: 'Usuário não autorizado!',
                   code: 'author/user-not-authorized'
               });
           }

           const author = await Author.findByPk(req.params.id);

           if (!author) {
               return res.status(400).json({
                   message: 'Autor não encontrado!',
                   code: 'author/author-not-found'
               });
           }

           await author.destroy();

           return res.status(200).json();
       } catch(err) {
           return res.status(400).json({
               message: 'Operação indisponível!',
               code: 'author/operation-not-allowed'
           });
       }
   }

}

export default new AuthorController();