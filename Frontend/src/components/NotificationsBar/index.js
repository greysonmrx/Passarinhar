import React, { useEffect, useState, useMemo } from 'react';
import { TiTimes } from 'react-icons/ti';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
    Container,
    Top,
    Title,
    Button,
    NotificationList,
    Notification,
    Scroll,
    NotificationButton,
} from './styles';

export default function NotificationsBar() {
    const [notifications, setNotifications] = useState([]);
    const [margin, setMargin] = useState(0);

    const hasUnread = useMemo(
        () => Boolean(notifications.find(notification => notification.read === false)),
        [notifications]
    );

    async function handleMarkAsRead(id) {
        try {
            await api.put(`/notifications/${id}`);

            setNotifications(
                notifications.map(notification =>
                    notification._id === id ? { ...notification, read: true } : notification
                )
            );
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        async function loadNotifications() {
            try {
                const response = await api.get('/notifications');

                const data = response.data.map(notification => ({
                    ...notification,
                    timeDistance: formatDistance(
                        parseISO(notification.createdAt),
                        new Date(),
                        { addSuffix: true, locale: pt }
                    )
                }));

                setNotifications(data);
            } catch(err) {
                toast.error(err.response.data.message);
            }
        }

        loadNotifications();
    }, []);

    return (
        <>
            <Container margin={margin}>
                <Top>
                    <Title unRead={hasUnread}>Notificações</Title>
                    
                    <Button onClick={() => setMargin(-400)}>
                        <TiTimes color='#b1b1b3' size={23}/>
                    </Button>
                </Top>
                <NotificationList>
                    <Scroll>
                        {
                            notifications.map(notification => (
                                <Notification key={notification._id}>
                                    <img src={`https://api.adorable.io/avatar/30/${notification.user}.png`} alt={notification.user} />
                                    <div>
                                        <span>{notification.user}</span>
                                        <p>{notification.content}</p>
                                        <time>{notification.timeDistance}</time>
                                        <button type='button' onClick={() => handleMarkAsRead(notification._id)} style={{ display: notification.read ? 'none' : 'block' }}>
                                            Marcar como lida
                                        </button>                                  
                                    </div>       
                                </Notification>
                            ))
                        }
                    </Scroll>
                </NotificationList>
            </Container>
            <NotificationButton onClick={() => setMargin(0)}>
                <MdNotifications 
                    color='#212121'
                    size={25}
                />
            </NotificationButton>
        </>
    );
}