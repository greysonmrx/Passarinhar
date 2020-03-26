import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Input,
    ButtonIcon
} from './styles';

export default function Searchbar({ search, searching, close }) {
    const [name, setName] = useState();

    return (
        <Container>
            <Icon name='search' size={22} color='#CCCCCC'/>
            <Input 
                placeholder='Pesquisar livros'
                value={name}
                onChangeText={setName}
                onSubmitEditing={() => search(name)}
            />
            <ButtonIcon onPress={() => { close(false); setName(''); }}>
                <Icon name='x' size={22} color={ searching ? '#e53935' : '#FFFFFF'}/>
            </ButtonIcon>
        </Container>
    );
}