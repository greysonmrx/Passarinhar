import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 20px 0;
    flex-direction: row;
    align-items: center;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-bottom-width: 1px;
`;

export const Image = styled.Image`
    height: 111px;
    width: 80px;
    border-radius: 5px;
    margin-right: 10px;
`;

export const Content = styled.View`
    flex: 1;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 1
})`
    font-family: 'Product Sans Bold';
    font-size: 18px;
    margin-bottom: 15px;
    color: #212121;
`;

export const StatusContent = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
    align-items: flex-end;
`;

export const Status = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 16px;
    color: ${props => props.status === 'canceled' ? '#e53935' : '#4CAF50' };
`;

export const StatusDate = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 16px;
    color: #212121;
`;

export const Description = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 14px;
    color: #212121;
`;
