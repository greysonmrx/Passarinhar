import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FiSearch } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Modal from '../../components/Modal';

import {
    Container,
    Title,
    SearchContent,
    InputContainer,
    Table,
    Action,
    ActionContent,
    Scroll,
} from './styles';

export default function Users() {
    const [modal, setModal] = useState({ isOpened: false, publisher: undefined });
    const [users, setUsers] = useState([]);

    function handleCPF(cpf){
        cpf = cpf.replace(/[^\d]/g, "");

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function handleCEP(cep){
        cep = cep.replace(/[^\d]/g, "");

        return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    }

    async function handleRemoveUser(id) {
        try {
            setUsers(users.filter(user => user.id !== id));

            setModal({ isOpened: false, user: undefined });

            await api.delete(`/users/${id}`);        
            
            toast.success('Usuário removido com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get(`/users`);

                const data = response.data.map(user => ({
                    ...user,
                    avatar: `https://api.adorable.io/avatar/25/${user.name}.png`,
                    timeDistance: format(
                        new Date(user.createdAt), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    )
                }));
    
                setUsers(data);
            } catch(err) {
                toast.error(err.response.data.message);
            }
        }

        loadUsers();
    }, []);

    return (
        <Container>
            <Modal 
                isOpened={modal.isOpened}
                no={() => setModal({ isOpened: false, user: undefined })}
                yes={() => handleRemoveUser(modal.id) }
            >
                Você tem certeza que deseja excluir o usuário {modal.user}?
            </Modal>
            <Title>Usuários</Title>
            <SearchContent>
                <InputContainer>
                    <FiSearch color='#b1b1b3' size={22} />
                    <input placeholder='Procurar usuários' />
                </InputContainer>
            </SearchContent>
            <Scroll>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CEP</th>
                            <th>CPF</th>
                            <th>Data de criação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td>
                                        <img src={user.avatar} alt={user.name}/>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{handleCEP(user.cep)}</td>
                                    <td>{handleCPF(user.cpf)}</td>
                                    <td>{user.timeDistance}</td>
                                    <td>
                                        <ActionContent>
                                            <Action cancel onClick={() => setModal({ isOpened: true, user: user.name, id: user.id })}>
                                                <MdDelete 
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