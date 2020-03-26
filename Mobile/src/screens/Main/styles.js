import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background: #F5F5F5;
`;

export const Header = styled.View`
    background: #ed2b6c;
    height: 100px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 20px;
    align-items: center;
    z-index: 10;
`;

export const HeaderContent = styled.View`
    padding-bottom: 25px;
`;

export const Top = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const Content = styled.ScrollView`
    flex: 1;
    padding: 30px 0 0px 0;
`;

export const Title = styled.Text`
    margin-left: 20px;
    margin-bottom: 10px;
    font-family: 'Product Sans Regular';
    font-size: 20px;
    color: #212121;
`;

export const Message = styled.Text.attrs({
    numberOfLines: 2
})`
    font-family: 'Product Sans Regular';
    font-size: 20px;
    color: #FFFFFF;
    max-width: 80%;
`;

export const Name = styled.Text`
    font-family: 'Product Sans Bold';
    font-size: 19px;
    color: #FFFFFF;
`;

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

export const ListHorizontal = styled.FlatList.attrs({
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    contentContainerStyle: { padding: 20 }
})``;

export const SectionHorizontal = styled.View`
    flex: 1;
    height: 295px;
    margin-bottom: 25px;
`;

export const SectionVertical = styled.View`
    flex: 1;
    width: 100%;
    margin-bottom: 50px;
`;

export const ContentSearch = styled.View`
    margin: 20px 0;
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