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

export default function NewAuthors() {
    const [author, setAuthor] = useState();

    async function handleNewAuthor() {
        try {
            await api.post(`/authors`, {
                name: author
            });

            history.push('/authors');

            toast.success('Autor adicionado com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Novo autor</Title>
            <Content>
                <InputContainer>
                    <input type='text' placeholder='Nome' onChange={(text) => setAuthor(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleNewAuthor()}>Adicionar</ButtonAdd>
            </Content>
        </Container>
    );
}