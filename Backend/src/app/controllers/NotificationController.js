import Notification from '../schemas/Notification';

import User from '../models/User';

class NotificationController {
    async index(req, res) {
        try {
            const { page = 1 } = req.query;

            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'notification/user-not-authorized'
                });
            }

            const notifications = await Notification.find()
                .sort({ updatedAt: 'desc'})
                .skip((page - 1) * 20)
                .limit(20);

            return res.status(200).json(notifications);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'notification/operation-not-allowed'
            });
        }
    }

    async update(req, res) {
        try {
            const isAdmin = await User.findByPk(req.userId);

            if (!isAdmin.admin) {
                return res.status(401).json({
                    message: 'Usuário não autorizado!',
                    code: 'notification/user-not-authorized'
                });
            }

            const notification = await Notification.findByIdAndUpdate(
                req.params.id,
                { read: true },
                { new: true }
            );

            return res.status(200).json(notification);
        } catch(err) {
            return res.status(400).json({
                message: 'Operação indisponível',
                code: 'notification/operation-not-allowed'
            });
        }
    }
}

export default new NotificationController();