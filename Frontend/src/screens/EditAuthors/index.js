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

export default function EditAuthors({ location }) {
    const [author, setAuthor] = useState(location.state.author.name);
    const { id } = location.state.author;

    async function handleUpdateAuthor() {
        try {
            await api.put(`/authors/${id}`, {
                name: author
            });

            history.push('/authors');

            toast.success('Autor atualizado com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Editar autor</Title>
            <Content>
                <InputContainer>
                    <input placeholder='Nome' value={author} onChange={(text) => setAuthor(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleUpdateAuthor()}>Salvar</ButtonAdd>
            </Content>
        </Container>
    );
}