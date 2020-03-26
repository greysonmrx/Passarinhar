import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    background: #FFFFFF;
`;

export const Logo = styled.Image`
    width: 200px;
    height: 200px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 20px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
`;

export const SignUpLink = styled.TouchableOpacity`
    padding: 5px;
    margin-top: 5px;
`;

export const SignUpLinkText = styled.Text`
    color: #404040;
    font-family: 'Product Sans Italic';
    font-size: 13px;
`;
