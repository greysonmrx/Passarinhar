import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import Rating from '../../components/Rating';
import Label from '../../components/Label';
import Button from '../../components/Button';
import Rate from '../../components/Rate';

import {
  Container,
  Header,
  Image,
  Title,
  Loading,
  Author,
  AuthorsContent,
  RatingContent,
  RatingText,
  GendersContent,
  Gender,
  Synopsis,
  LoadingContent,
  RankingContent,
  RankingTitle,
  Top,
  UserAvatar,
  Ranking,
  UserName,
  UserComment,
  TitleContent,
  Content,
  TextArea,
  TextAreaContent,
} from './styles';

export default function BookDetails({navigation}) {
  const userId = useSelector(state => state.user.profile.id);
  const book_id = navigation.getParam('id');

  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [loadingRate, setLoadingRate] = useState(false);

  async function createLoan() {
    try {
      const response = await api.post('/loans', {book_id});

      Alert.alert('OK!', 'Empréstimo realizado com sucesso!');
    } catch (err) {
      Alert.alert('Erro!', err.response.data.message);
    }
  }

  function handleShowRate() {
    var can = true;

    for (var i = 0; i < ratings.length; i++) {
      if (ratings[i].user.id === userId) {
        can = false;

        break;
      } else {
        can = true;
      }
    }

    return can;
  }

  function handleRatings() {
    if (ratings.length !== 0) {
      var sum = 0;

      ratings.map(rating => {
        sum += rating.value;
      });

      return sum / ratings.length;
    }

    return 0;
  }

  async function handleRate() {
    try {
      setLoadingRate(true);
      const response = await api.post(`/ratings/${book_id}`, {
        value: rate,
        comment,
      });

      Alert.alert('OK!', 'Livro avaliado com sucesso!');
      navigation.navigate('Main');

      setLoadingRate(false);
    } catch (err) {
      setLoadingRate(false);

      console.log(err.response);

      Alert.alert('Erro!', 'Ocorreu um erro ao avaliar o livro!');
      navigation.navigate('Main');
    }
  }

  function handleAuthors() {
    var authorsElements = [];

    for (var i = 0; i < authors.length; i++) {
      if (i === authors.length - 1) {
        authorsElements.push(
          <Author key={String(authors[i].id)}>{authors[i].name}</Author>,
        );
      } else {
        authorsElements.push(
          <Author key={String(authors[i].id)}>{authors[i].name}, </Author>,
        );
      }
    }

    return authorsElements;
  }

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        const response = await api.get(`/books/byid/${book_id}`);

        setRatings(response.data.ratings);
        setGenders(response.data.genders);
        setAuthors(response.data.authors);
        setBookDetails(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadBook();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingContent>
          <Loading size="large" color="#ed2b6c" />
        </LoadingContent>
      ) : (
        <>
          <Header>
            <Image source={{uri: bookDetails.image.url}} resizeMode="contain" />
            <Title>{bookDetails.name}</Title>
            <AuthorsContent>{handleAuthors()}</AuthorsContent>
            <GendersContent>
              {genders.map(gender => (
                <Gender key={String(gender.id)}>{gender.name}</Gender>
              ))}
            </GendersContent>
            <RatingContent>
              <Rating size={20} ratingValue={handleRatings()} />
              <RatingText>
                {ratings.length !== 0
                  ? ratings.length > 1
                    ? `${ratings.length} classificações`
                    : `${ratings.length} classificação`
                  : 'Nenhuma classificação'}
              </RatingText>
            </RatingContent>
          </Header>
          <Button
            style={{marginBottom: 30}}
            disabled={bookDetails.available === 0}
            onPress={() => createLoan()}>
            {bookDetails.available !== 0
              ? 'Realizar empréstimo'
              : 'Nenhum exemplar disponível'}
          </Button>
          <Synopsis>{`${bookDetails.synopsis}`}</Synopsis>
          {ratings.length !== 0 ? (
            <RankingContent>
              <RankingTitle>Avaliações sobre o livro</RankingTitle>
              {ratings.map((rating, index) => (
                <Ranking key={String(rating.id)}>
                  <Top>
                    <UserAvatar
                      source={{
                        uri: `https://api.adorable.io/avatar/80/${rating.user.name}.png`,
                      }}
                    />
                    <UserName>{rating.user.name}</UserName>
                  </Top>
                  <Rating
                    style={{marginVertical: 20}}
                    size={15}
                    ratingValue={rating.value}
                  />
                  <UserComment>{rating.comment}</UserComment>
                </Ranking>
              ))}
            </RankingContent>
          ) : null}
          {handleShowRate() ? (
            <Content>
              <TitleContent>Avalie este livro</TitleContent>
              <Rate getRate={setRate} />
              <TextAreaContent>
                <TextArea
                  multiline
                  placeholder="Nos diga sua opnião sobre o livro..."
                  onChangeText={setComment}
                  maxLength={200}
                />
              </TextAreaContent>
              <Button
                disabled={rate === 0 || !comment}
                onPress={() => handleRate()}>
                Avaliar
              </Button>
            </Content>
          ) : null}
        </>
      )}
    </Container>
  );
}

BookDetails.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    elevation: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Main')}
      style={{padding: 10}}>
      <Icon name="chevron-left" size={30} color="#ed2b6c" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity style={{padding: 10}}>
      <Icon name="chevron-left" size={30} color="rgba(0, 0, 0, 0)" />
    </TouchableOpacity>
  ),
  headerTitle: () => (
    <Label style={{fontSize: 15, flexGrow: 1, textAlign: 'center'}}>
      DETALHES
    </Label>
  ),
  headerTitleAlign: 'center',
});
