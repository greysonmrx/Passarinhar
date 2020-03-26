import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const Header = styled.View`
  height: 400px;
  padding: 20px 0;
  align-items: center;
`;

export const Image = styled.Image`
  flex: 1;
  width: 150px;
  align-self: center;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 25px;
  text-align: center;
  margin: 20px 0 15px 0;
  color: #212121;
`;

export const LoadingContent = styled.View`
  flex: 1;
  align-self: center;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;

export const Author = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
`;

export const AuthorsContent = styled.View`
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const RatingContent = styled.View`
  align-items: center;
`;

export const RatingText = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 14px;
  color: #999;
  margin-top: 5px;
`;

export const GendersContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Gender = styled.Text`
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid #ed2b6c;
  font-family: 'Product Sans Regular';
  font-size: 14px;
  color: #ed2b6c;
  margin-bottom: 5px;
`;

export const Synopsis = styled.Text`
  text-align: justify;
  font-family: 'Product Sans Regular';
  font-size: 15px;
  color: #717171;
  line-height: 25px;
`;

export const RankingContent = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const RankingTitle = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 22px;
  margin-bottom: 10px;
  color: #212121;
`;

export const Ranking = styled.View`
  padding: 20px 0;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 15px;
`;

export const UserName = styled.Text.attrs({
  numberOfLines: 2,
})`
  flex: 1;
  font-family: 'Product Sans Regular';
  font-size: 14px;
  color: #515151;
`;

export const UserComment = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 14px;
  color: #515151;
`;

export const TitleContent = styled.Text`
  font-family: 'Product Sans Regular';
  font-size: 22px;
  color: #212121;
`;

export const Content = styled.View`
  flex: 1;
  height: 295px;
  margin: 20px 0 50px 0;
`;

export const TextArea = styled.TextInput`
  font-size: 15px;
  color: #404040;
  font-family: 'Product Sans Regular';
`;

export const TextAreaContent = styled.View`
  padding: 0 15px;
  height: 150px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
`;
