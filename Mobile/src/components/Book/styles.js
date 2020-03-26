import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    margin-right: 25px;
    width: 125px;
    max-height: 230px;
`;

export const Image = styled.Image`
    flex: 1;
    width: 120px;
    align-self: center;
    border-radius: 5px;
`;

export const Content = styled.View`
    align-items: flex-start;
    margin-left: 5px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 1
})`
    font-family: 'Product Sans Regular';
    margin: 10px 0 5px 0;
    font-size: 14.5px;
`;

export const Status = styled.Text`
    font-family: 'Product Sans Bold';
    color: ${props => props.available ? '#4CAF50' : '#e53935'};
    margin-top: 5px;
`;
