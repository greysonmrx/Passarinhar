import React, { useMemo } from 'react';
import { parseISO, formatDistance, format, isAfter, startOfHour } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
    Container,
    Image,
    Content,
    Name,
    StatusContent,
    Status,
    StatusDate,
    Description,
} from './styles';

export default function Loan({ data }) {
    const mano = format(new Date(), 'dd/MM/yyyy');

    function handleDescription() {
        if (data.status === 'canceled') {
            return null;
        } else if (data.status === 'delivered') {
            const returnDate = formatDistance(parseISO(data.return_date), new Date(), {
                locale: pt,
                addSuffix: true
            });

            return <Description>Devolva o livro {returnDate}.</Description>;
        } else if (data.status === 'returned') {
            const returnDate = startOfHour(parseISO(data.return_date));
            const realReturnDate = startOfHour(parseISO(data.real_return_date));

            if (isAfter(realReturnDate, returnDate)) {
                return <Description>Você entregou o livro com {formatDistance(parseISO(data.return_date), data.real_return_date, { addSuffix: true })} de atraso!</Description>;
            }

            return null;
        } else if (data.status === 'accepted') {
            return <Description>Vá até o clube para retirar seu livro!</Description>;
        }  
    }

    function handleDate() {
        if (data.status === 'canceled') {
            return parseDate(data.canceled_at);
        } else if (data.status === 'delivered') {
            return parseDate(data.delivery_date);
        } else if (data.status === 'returned') {
            return parseDate(data.real_return_date);
        } else if (data.status === 'accepted') {
            return parseDate(data.createdAt);
        }        
    }

    function parseDate(date) {
        return formatDistance(parseISO(date), new Date(), {
            locale: pt,
            addSuffix: true
        });
    }

    function handleStatus(status) {
        switch (status) {
            case 'accepted': {
                return 'Aceito';
            };
            case 'delivered': {
                return 'Entregue';
            };
            case 'returned': {
                return 'Devolvido';
            };
            case 'canceled': {
                return 'Cancelado';
            };
        }
    }

    return (
        <Container>
            <Image source={{ uri: data.book.image.url }} resizeMode='contain'/>
            <Content>
                <Name>{data.book.name}</Name>
                <StatusContent>
                    <Status status={data.status}>
                        {handleStatus(data.status)}
                        <StatusDate> {handleDate()}</StatusDate> 
                    </Status>
                </StatusContent>
                {handleDescription()}
            </Content>
        </Container>
    );
}