import React from 'react';

import {
    Container,
    Content,
    Logo,
    ContentText,
    ContentButton,
    Login,
    Register,
    Version,
} from './styles';

import logo from '../../../assets/images/logo.jpg';

export default function Welcome({ navigation }) {
    return (
        <Container>
            <Content>
                <Logo 
                    source={logo} 
                    resizeMode='contain'
                />
                <ContentText>Este é um aplicativo desenvolvido por alunos do curso de informática para a gestão e organização dos livros do Clube de Leitura Passarinhar.</ContentText>
            </Content>
            <ContentButton>
                <Login onPress={() => navigation.navigate('Login')}>
                    Entrar                    
                </Login>
                <Register 
                    outline
                    onPress={() => navigation.navigate('Register')}
                >
                    Cadastrar
                </Register>
                <Version>Versão 1.0.0</Version>
            </ContentButton>
        </Container>
    );
}