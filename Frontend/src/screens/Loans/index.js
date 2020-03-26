import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FiSearch } from 'react-icons/fi';
import { MdLocalShipping, MdNotInterested, MdCached } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';

import {
    Container,
    Title,
    SearchContent,
    InputContainer,
    Table,
    Status,
    Action,
    ActionContent,
    Scroll,
} from './styles';

export default function Loans() {
    const [loans, setLoans] = useState([]);

    function handleStatus(status) {
        switch (status) {
            case 'accepted':
                return 'Aceito';
            case 'delivered':
                return 'Entregue';
            case 'returned':
                return 'Devolvido';
            case 'canceled': 
                return 'Cancelado';
            default:
                return;
        }
    }

    useEffect(() => {
        async function loadLoans() {
            try {
                const response = await api.get(`/admin/loans`);

                const data = response.data.map(loan => ({
                    ...loan,
                    canceled_at: loan.canceled_at ? format(
                        new Date(loan.canceled_at), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    ) : '- - -',
                    delivery_date: loan.delivery_date ? format(
                        new Date(loan.delivery_date), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    ) : '- - -',
                    return_date: loan.return_date ? format(
                        new Date(loan.return_date), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    ) : '- - -'
                }));
    
                setLoans(data);
            } catch(err) {
                toast.error(err.response.data.message);
            }
        }

        loadLoans();
    }, []);

    return (
        <Container>
            <Title>Empréstimos</Title>
            <SearchContent>
                <InputContainer>
                    <FiSearch color='#b1b1b3' size={22} />
                    <input placeholder='Procurar empréstimos' />
                </InputContainer>
            </SearchContent>
            <Scroll>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Livro</th>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th>Data de cancelamento</th>
                            <th>Data de entrega</th>
                            <th>Data de retorno</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loans.map(loan => (
                                <tr key={loan.id}>
                                    <td>#{loan.id}</td>
                                    <td>{loan.book.id}</td>
                                    <td>{loan.user.id}</td>
                                    <td>
                                        <Status available={loan.status !== 'canceled'}>{handleStatus(loan.status)}</Status>
                                    </td>
                                    <td>{loan.canceled_at}</td>
                                    <td>{loan.delivery_date}</td>
                                    <td>{loan.return_date}</td>
                                    <td>
                                        <ActionContent>
                                            <Action delivery>
                                                <MdLocalShipping 
                                                    size={20}
                                                    color='#FFFFFF'
                                                />
                                            </Action>
                                            <Action return>
                                                <MdCached 
                                                    size={20}
                                                    color='#FFFFFF'
                                                />
                                            </Action>
                                            <Action cancel>
                                                <MdNotInterested 
                                                    size={20}
                                                    color='#FFFFFF'
                                                />
                                            </Action>
                                        </ActionContent>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Scroll>
        </Container>
    );
}