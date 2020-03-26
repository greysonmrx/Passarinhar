import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    padding: 30px;
    background: #FFFFFF;
`;

export const Content = styled.View`
    width: 100%;
    align-items: center;
    height: 50%;
    justify-content: flex-end;
`;

export const Logo = styled.Image`
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
`;

export const ContentText = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 14.5px;
    text-align: center;
`;

export const ContentButton = styled.View`
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: flex-end;
`;

export const Login = styled(Button)``;

export const Register = styled(Button)`
    margin: 20px 0;
`;

export const Version = styled.Text`
    color: #BBBBBB;
    font-family: 'Product Sans Italic';
    font-size: 12px;
`;
