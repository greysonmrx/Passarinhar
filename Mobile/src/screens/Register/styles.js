import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

export const ScrollContainer = styled.ScrollView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 50px 30px;
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

export const SignInLink = styled.TouchableOpacity`
    padding: 5px;
    margin-top: 5px;
`;

export const SignInLinkText = styled.Text`
    color: #404040;
    font-family: 'Product Sans Italic';
    font-size: 13px;
`;
