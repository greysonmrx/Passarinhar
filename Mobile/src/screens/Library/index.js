import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {withNavigationFocus} from 'react-navigation';

import api from '../../services/api';
import Label from '../../components/Label';
import Loan from '../../components/Loan';

import {
  Container,
  Loading,
  ErrorContent,
  NoResultsFound,
  NoResultsFoundMessage,
} from './styles';

function Library({navigation, isFocused}) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadLoans() {
    try {
      setLoading(true);
      const response = await api.get('/loans');

      setLoans(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response.message);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadLoans();
    }
  }, [isFocused]);

  return (
    <Container>
      {loading ? (
        <Loading size="large" color="#ed2b6c" />
      ) : loans.length === 0 ? (
        <ErrorContent>
          <LottieView
            autoPlay
            loop={false}
            source={require('../../../assets/animations/books-not-found.json')}
            style={{width: '80%'}}
          />
          <NoResultsFound>Nenhum empréstimo encontrado</NoResultsFound>
          <NoResultsFoundMessage>
            Faça a busca por um livro e realize um empréstimo!
          </NoResultsFoundMessage>
        </ErrorContent>
      ) : (
        loans.map(loan => (
          <Loan
            key={String(loan.id)}
            data={loan}
            onPress={() => alert(`Empréstimo com id ${loan.id} cancelado!`)}
          />
        ))
      )}
    </Container>
  );
}

Library.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    elevation: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerTitle: () => (
    <Label style={{fontSize: 15, flexGrow: 1, textAlign: 'center'}}>
      MEUS EMPRÉSTIMOS
    </Label>
  ),
  headerTitleAlign: 'center',
});

export default withNavigationFocus(Library);
