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

export default function EditGenders({ location }) {
    const [gender, setGender] = useState(location.state.gender.name);
    const { id } = location.state.gender;

    async function handleUpdateGender() {
        try {
            await api.put(`/genders/${id}`, {
                name: gender
            });

            history.push('/genders');

            toast.success('Gênero atualizado com sucesso!');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Editar gênero</Title>
            <Content>
                <InputContainer>
                    <input placeholder='Nome' value={gender} onChange={(text) => setGender(text.target.value)}/>
                </InputContainer>
                <ButtonAdd type='button' onClick={() => handleUpdateGender()}>Salvar</ButtonAdd>
            </Content>
        </Container>
    );
}