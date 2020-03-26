import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FaPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';
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
    ButtonAdd,
} from './styles';

export default function Publishers() {
    const [modal, setModal] = useState({ isOpened: false, publisher: undefined });
    const [publishers, setPublishers] = useState([]);

    async function handleDeletePublisher(id) {
        try {
            setPublishers(publishers.filter(publisher => publisher.id !== id));

            setModal({ isOpened: false, publisher: undefined });

            await api.delete(`/publishers/${id}`);        
            
            toast.success('Editora removida com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        async function loadPublishers() {
            try {
                const response = await api.get(`/publishers`);

                const data = response.data.map(publisher => ({
                    ...publisher,
                    timeDistance: format(
                        new Date(publisher.createdAt), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    )
                }));
    
                setPublishers(data);
            } catch(err) {
                toast.error(err.response.data.message);
            }
        }

        loadPublishers();
    }, []);

    return (
        <Container>
            <Modal 
                isOpened={modal.isOpened}
                no={() => setModal({ isOpened: false, publisher: undefined })}
                yes={() => handleDeletePublisher(modal.id) }
            >
                Você tem certeza que deseja excluir a editora {modal.publisher}?
            </Modal>
            <Title>Editoras</Title>
            <SearchContent>
                <InputContainer>
                    <FiSearch color='#b1b1b3' size={22} />
                    <input placeholder='Procurar editoras' />
                </InputContainer>
                <ButtonAdd onClick={() => history.push('/publishers/new')}>
                    <FaPlus 
                        size={16}
                        color='#FFFFFF'
                    />
                    <span>Nova editora</span>
                </ButtonAdd>
            </SearchContent>
            <Scroll>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de criação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            publishers.map(publisher => (
                                <tr key={publisher.id}>
                                    <td>#{publisher.id}</td>
                                    <td>{publisher.name}</td>
                                    <td>{publisher.timeDistance}</td>
                                    <td>
                                        <ActionContent>
                                            <Action put onClick={() => history.push({ pathname: '/publishers/edit', state: { publisher } })}>
                                                <MdModeEdit 
                                                    size={20}
                                                    color='#FFFFFF'
                                                />
                                            </Action>
                                            <Action delete onClick={() => setModal({ isOpened: true, publisher: publisher.name, id: publisher.id })}>
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