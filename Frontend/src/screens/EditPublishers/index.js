import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import {
    Container,
    Title,
    Content,
    InputContainer,
    ButtonAdd,
} from './styles';

export default function EditPublishers({ location }) {
    const [publisher, setPublisher] = useState(location.state.publisher.name);
    const { id } = location.state.publisher;

    async function handleUpdatePublisher() {
        try {
            await api.put(`/publishers/${id}`, {
                name: publisher
            });

            history.push('/publishers');

            toast.success('Editora atualizada com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Editar editora</Title>
            <Content>
                <InputContainer>
                    <input placeholder='Nome' value={publisher} onChange={(text) => setPublisher(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleUpdatePublisher()}>Salvar</ButtonAdd>
            </Content>
        </Container>
    );
}