import React, {useEffect, useState, useMemo} from 'react';
import api from '../../services/api';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {withNavigationFocus} from 'react-navigation';

import Label from '../../components/Label';
import Searchbar from '../../components/Searchbar';
import Book from '../../components/Book';
import CardBook from '../../components/CardBook';

import {
  Container,
  Header,
  Top,
  Content,
  Title,
  Message,
  Name,
  Avatar,
  ListHorizontal,
  SectionVertical,
  SectionHorizontal,
  ContentSearch,
  HeaderContent,
  Loading,
  ErrorContent,
  NoResultsFound,
  NoResultsFoundMessage,
} from './styles';

function Main({navigation, isFocused}) {
  const profile = useSelector(state => state.user.profile);

  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searching, setSearching] = useState(false);

  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingLatestBooks, setLoadingLatestBooks] = useState(true);
  const [loadingSearchedBooks, setLoadingSearchedBooks] = useState(true);

  async function loadLatestBooks() {
    setLoadingLatestBooks(true);
    const response = await api.get('books/bydate');

    setLatestBooks(response.data);
    setLoadingLatestBooks(false);
  }

  async function loadBooks() {
    setLoadingBooks(true);
    const response = await api.get('books');

    setBooks(response.data);
    setLoadingBooks(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadLatestBooks();
      loadBooks();
    }
  }, [isFocused]);

  async function loadSearchBooks(name) {
    try {
      setSearching(true);
      setLoadingSearchedBooks(true);

      const response = await api.get('books/byname', {
        params: {name},
      });

      setSearchedBooks(response.data);
      setLoadingSearchedBooks(false);
    } catch (err) {
      setSearchedBooks([]);
      setLoadingSearchedBooks(false);
    }
  }

  return (
    <Container>
      <Searchbar
        search={loadSearchBooks}
        searching={searching}
        close={setSearching}
      />
      <HeaderContent>
        <Header>
          <Top>
            <Message>
              Olá, <Name>{profile.name}!</Name>
            </Message>
            <Avatar
              source={{
                uri: `https://api.adorable.io/avatar/80/${profile.name}.png`,
              }}
            />
          </Top>
        </Header>
      </HeaderContent>
      <Content>
        {!searching ? (
          <>
            <SectionHorizontal>
              <Title>Últimos lançamentos</Title>
              {loadingLatestBooks ? (
                <Loading size="large" color="#ed2b6c" />
              ) : (
                <ListHorizontal
                  data={latestBooks}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item}) => (
                    <Book
                      data={item}
                      onPress={() =>
                        navigation.navigate('BookDetails', {id: item.id})
                      }
                    />
                  )}
                />
              )}
            </SectionHorizontal>
            <SectionVertical>
              <Title style={{marginBottom: 50}}>Aprecie lendo...</Title>
              {loadingBooks ? (
                <Loading size="large" color="#ed2b6c" />
              ) : (
                books.map(book => (
                  <CardBook
                    key={String(book.id)}
                    data={book}
                    onPress={() =>
                      navigation.navigate('BookDetails', {id: book.id})
                    }
                  />
                ))
              )}
            </SectionVertical>
          </>
        ) : (
          <ContentSearch>
            {loadingSearchedBooks ? (
              <Loading size="large" color="#ed2b6c" />
            ) : searchedBooks.length > 0 ? (
              searchedBooks.map(book => (
                <CardBook
                  key={String(book.id)}
                  data={book}
                  onPress={() =>
                    navigation.navigate('BookDetails', {id: book.id})
                  }
                />
              ))
            ) : (
              <ErrorContent>
                <LottieView
                  autoPlay
                  loop={false}
                  source={require('../../../assets/animations/books.json')}
                  autoSize
                />
                <NoResultsFound>Nenhum resultado encontrado</NoResultsFound>
                <NoResultsFoundMessage>
                  Use apenas palavras que estão contidas no título do livro!
                </NoResultsFoundMessage>
              </ErrorContent>
            )}
          </ContentSearch>
        )}
      </Content>
    </Container>
  );
}

Main.navigationOptions = {
  header: null,
};

export default withNavigationFocus(Main);
