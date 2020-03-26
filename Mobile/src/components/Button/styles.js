import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    background: ${props => props.outline ? 'transparent' : props.disabled ? '#999999' : '#ed2b6c'};
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 55px;
    border-radius: 8px;
    border: 2px solid ${props => props.disabled ? '#999999' : '#ed2b6c'};
`;

export const Text = styled.Text`
    color: ${props => props.outline ? props.disabled ? '#999999' : '#ed2b6c' : '#FFFFFF'};
    font-family: 'Product Sans Regular';
    font-size: 15.5px;
`;