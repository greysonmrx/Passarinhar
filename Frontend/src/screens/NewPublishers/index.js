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

export default function EditPublishers() {
    const [publisher, setPublisher] = useState();

    async function handleNewPublisher() {
        try {
            await api.post(`/publishers`, {
                name: publisher
            });

            history.push('/publishers');

            toast.success('Editora adicionada com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Nova editora</Title>
            <Content>
                <InputContainer>
                    <input placeholder='Nome' onChange={(text) => setPublisher(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleNewPublisher()}>Adicionar</ButtonAdd>
            </Content>
        </Container>
    );
}