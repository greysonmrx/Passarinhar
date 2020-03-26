import React from 'react';

import {
    Container,
    Content,
    Title,
    ButtonContent,
    Yes,
    No,
} from './styles';

export default function Modal({ yes, no, children, isOpened }) {
    return (
        <Container isOpened={isOpened}>
            <Content>
                <Title>{ children }</Title>
                <ButtonContent>
                    <Yes onClick={() => yes()}>Sim</Yes>
                    <No onClick={() => no()}>Não</No>
                </ButtonContent>
            </Content>
        </Container>
    );
} 