import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const Loading = styled.ActivityIndicator`
    flex: 1;
    align-self: center;
    justify-content: center;
`;

export const ErrorContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
`;

export const NoResultsFound = styled.Text`
    font-family: 'Product Sans Bold';
    font-size: 20px;
    color: #212121;
    text-align: center;
    margin: 10px 0;
`;

export const NoResultsFoundMessage = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 15px;
    color: #999999;
    text-align: center;
`;
