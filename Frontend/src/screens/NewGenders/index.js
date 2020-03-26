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

export default function NewGenders() {
    const [gender, setGender] = useState();

    async function handleNewGender() {
        try {
            await api.post(`/genders`, {
                name: gender
            });

            history.push('/genders');

            toast.success('Gênero adicionado com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Novo gênero</Title>
            <Content>
                <InputContainer>
                    <input placeholder='Nome' onChange={(text) => setGender(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleNewGender()}>Adicionar</ButtonAdd>
            </Content>
        </Container>
    );
}