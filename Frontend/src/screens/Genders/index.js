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

export default function Genders() {
    const [modal, setModal] = useState({ isOpened: false, author: undefined });
    const [genders, setGenders] = useState([]);

    async function handleDeleteGender(id) {
        try {
            setModal({ isOpened: false, gender: undefined });

            setGenders(genders.filter(gender => gender.id !== id));
            
            await api.delete(`/genders/${id}`);

            toast.success('Gênero removido com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        async function loadGenders() {
            try {
                const response = await api.get(`/genders`);

                const data = response.data.map(gender => ({
                    ...gender,
                    timeDistance: format(
                        new Date(gender.createdAt), 
                        "dd 'de' MMMM yyyy", 
                        { locale: pt }
                    )
                }));
    
                setGenders(data);
            } catch(err) {
                toast.error(err.response.data.message);
            }
        }

        loadGenders();
    }, []);

    return (
        <Container>
            <Modal 
                isOpened={modal.isOpened}
                no={() => setModal({ isOpened: false, gender: undefined })}
                yes={() => handleDeleteGender(modal.id) }
            >
                Você tem certeza que deseja excluir o gênero {modal.gender}?
            </Modal>
            <Title>Gêneros</Title>
            <SearchContent>
                <InputContainer>
                    <FiSearch color='#b1b1b3' size={22} />
                    <input placeholder='Procurar gêneros' />
                </InputContainer>
                <ButtonAdd onClick={() => history.push('/genders/new')}>
                    <FaPlus 
                        size={16}
                        color='#FFFFFF'
                    />
                    <span>Novo gênero</span>
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
                            genders.map(gender => (
                                <tr key={gender.id}>
                                    <td>#{gender.id}</td>
                                    <td>{gender.name}</td>
                                    <td>{gender.timeDistance}</td>
                                    <td>
                                        <ActionContent>
                                            <Action put onClick={() => history.push({ pathname: '/genders/edit', state: { gender } })}>
                                                <MdModeEdit 
                                                    size={20}
                                                    color='#FFFFFF'
                                                />
                                            </Action>
                                            <Action delete onClick={() => setModal({ isOpened: true, gender: gender.name, id: gender.id })}>
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