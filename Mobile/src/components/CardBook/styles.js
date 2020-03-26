import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.TouchableOpacity`
    width: ${Dimensions.get('screen').width - 40}px;
    align-self: center;
    background: #FFFFFF;
    margin-bottom: 35px;
    elevation: 3;
    border-radius: 8px;
    min-height: 110px;
    flex-direction: row;
    padding: 0 15px 0 95px;
`;

export const Image = styled.Image`
    position: absolute;
    height: 111px;
    width: 80px;
    border-radius: 5px;
    top: -20px;
    left: 15px;
`;

export const Content = styled.View`
    flex: 1;
    margin-left: 15px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 1
})`
    font-family: 'Product Sans Bold';
    font-size: 16px;
    margin-top: 10px;
    color: #212121;
`;

export const Synopsis = styled.Text.attrs({
    numberOfLines: 2
})`
    font-family: 'Product Sans Regular';
    margin: 5px 0 10px 0;
    font-size: 14px;
    color: #999;
`;
