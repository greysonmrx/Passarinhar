import File from '../models/File';

class FileController {
    async store(req, res) {
        try {
            const { originalname: name, filename: path } = req.file;

            const file = await File.create({
                name, path
            });

            return res.status(200).json(file);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível!',
                code: 'book/operation-not-allowed'
            });
        }
    }
}

export default new FileController();