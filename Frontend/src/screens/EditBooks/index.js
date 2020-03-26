import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import ImageField from '../../components/ImageField';

import {
    Container,
    Title,
    Content,
    InputContainer,
    InputContent,
    InputContentArea,
    ButtonAdd,
} from './styles';

const schema = Yup.object().shape({
    name: Yup.string()
        .required('O nome é obrigatório'),
    register_quantity: Yup.string()
        .required('A quantidade de exemplares é obrigatória'),
    synopsis: Yup.string()
        .required('A sinopse é obrigatória'),
    authors: Yup.string()
        .required('Precisa de pelo menos um autor'),
    genders:  Yup.string()
        .required('Precisa de pelo menos um gênero'),
    publishers: Yup.string()
        .required('Precisa de pelo menos uma editora')
});

export default function EditBooks({ location }) {
    const { book } = location.state;

    const [image, setImage] = useState();

    function handleArray(value) {
        const stringArray = value.split(',');
        const finalArray = [];

        for (let i = 0; i < stringArray.length; i++) {
            finalArray[i] = parseInt(stringArray[i]);
        }

        return finalArray;
    }

    async function handleSubmit({ name, synopsis, register_quantity, authors, publishers, genders }) {
        try {
            await api.put(`/books/${book.id}`, {
                name, synopsis, 
                register_quantity: parseInt(register_quantity), 
                authors: handleArray(authors),
                publishers: handleArray(publishers),
                genders: handleArray(genders),
                image_id: image
            });

            toast.success('Livro editado com sucesso!');

            history.push('/books');
        } catch(err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Container>
            <Title>Editar livro</Title>
            <Content>
                <Form initialData={book} schema={schema} onSubmit={handleSubmit}>
                    <InputContainer>
                        <ImageField 
                            name='image_id'
                            setImage={setImage}
                            src={book.image.url}
                        />
                    </InputContainer>                    
                    <InputContainer>
                        <InputContent>
                            <Input name='name' placeholder='Nome'/>
                        </InputContent>
                        <InputContent right>
                            <Input name='register_quantity' type='number' placeholder='Quantidade de exemplares'/>
                        </InputContent>
                    </InputContainer>
                    <InputContainer>
                        <InputContentArea>
                            <Textarea  name='synopsis' placeholder='Sinopse'/>
                        </InputContentArea>
                    </InputContainer>
                    <InputContainer>
                        <InputContent>
                            <Input name='authors' placeholder='ID do autor   Ex.:(38, 94)'/>
                        </InputContent>
                        <InputContent right>
                            <Input name='publishers' placeholder='ID da editora   Ex.:(7, 10)'/>
                        </InputContent>
                        <InputContent right>
                            <Input name='genders' placeholder='ID do gênero   Ex.:(21, 74)'/>
                        </InputContent>
                    </InputContainer>
                    <ButtonAdd type='submit'>Salvar</ButtonAdd>           
                </Form>
            </Content>
        </Container>
    );
}