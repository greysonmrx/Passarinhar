import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

export const Container = styled.View`
    position: absolute;
    background: #FFFFFF;
    width: ${Dimensions.get('window').width - 80}px;
    top: 75px;
    elevation: 1;
    padding: 0 0 0 15px;
    height: 46px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    align-self: center;
`;

export const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 10px;
    color: #404040;
    font-family: "Product Sans Regular";
`;

export const ButtonIcon = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    align-items: center;
    justify-content: center;
`;