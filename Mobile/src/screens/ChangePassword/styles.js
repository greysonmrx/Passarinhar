import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

export const Field = styled(Input)`
    margin-bottom: 15px;
`;

export const UpdateButton = styled(Button)`
    margin-top: 35px;
`;
