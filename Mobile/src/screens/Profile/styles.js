import styled from 'styled-components/native';

import Button from '../../components/Button';

export const Container = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const Header = styled.View`
    flex: 1;
    align-items: center;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
    padding: 40px 0 20px 0;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 1.5px;
    border-color: #ed2b6c;
`;

export const HeaderContent = styled.View`
    margin-top: 25px;
    align-items: center;
`;

export const Name = styled.Text`
    font-family: 'Product Sans Bold';
    font-size: 21px;
    margin-bottom: 10px;
    color: #212121;
    text-align: center;
`;

export const Email = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 15px;
    color: #999999;
    text-align: center;
`;

export const Content = styled.View`
    padding: 20px 0;
`;

export const ButtonFiled = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`;

export const ButtonFieldContent = styled.View`
    flex: 1;
`;

export const FieldName = styled.Text`
    font-family: 'Product Sans Regular';
    font-size: 17px;
    color: #212121;
    margin-bottom: 5px;
`;

export const FieldValue = styled.Text.attrs({
    numberOfLines: 1
})`
    font-family: 'Product Sans Regular';
    font-size: 15px;
    color: #999999;
`;

export const ChangePassword = styled(Button)`
    margin-top: 25px;
`;

export const Logout = styled(Button)`
    margin-top: 15px;
`;