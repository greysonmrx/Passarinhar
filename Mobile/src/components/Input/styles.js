import styled from 'styled-components/native';

export const Content = styled.View``;

export const Container = styled.View`
    padding: 0 15px;
    height: 46px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    border: ${props => props.error ? '2px' : '0px'} solid #D50000;
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(64, 64, 64, .5)'
})`
    flex: 1;
    font-size: 15px;
    color: #404040;
    font-family: "Product Sans Regular";
`;

export const Text = styled.Text`
    color: #D50000;
    font-size: 14px;
    font-family: 'Product Sans Regular';
    margin: 8px 0px 0px 4px;
`;