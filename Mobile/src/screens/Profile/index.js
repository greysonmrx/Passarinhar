import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {signOut} from '../../store/modules/auth/actions';

import {
  Container,
  Header,
  Avatar,
  HeaderContent,
  Name,
  Email,
  Content,
  ButtonFiled,
  ButtonFieldContent,
  FieldName,
  FieldValue,
  ChangePassword,
  Logout,
} from './styles';

export default function Profile({navigation}) {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/200/${profile.name}.png`,
          }}
        />
        <HeaderContent>
          <Name>{profile.name}</Name>
          <Email>{profile.email}</Email>
        </HeaderContent>
      </Header>
      <Content>
        <ButtonFiled
          onPress={() =>
            navigation.navigate('UpdateField', {
              fieldName: 'NOME COMPLETO',
              placeholder: 'Digite seu nome completo',
              value: profile.name,
              type: 'name',
            })
          }>
          <ButtonFieldContent>
            <FieldName>Nome completo</FieldName>
            <FieldValue>{profile.name || 'Sem nome'}</FieldValue>
          </ButtonFieldContent>
          <Icon name="chevron-right" color="#999999" size={20} />
        </ButtonFiled>
        <ButtonFiled
          onPress={() =>
            navigation.navigate('UpdateField', {
              fieldName: 'E-MAIL',
              placeholder: 'Digite seu e-mail',
              value: profile.email,
              type: 'email',
            })
          }>
          <ButtonFieldContent>
            <FieldName>E-mail</FieldName>
            <FieldValue>{profile.email || 'Sem e-mail'}</FieldValue>
          </ButtonFieldContent>
          <Icon name="chevron-right" color="#999999" size={20} />
        </ButtonFiled>
        <ButtonFiled
          onPress={() =>
            navigation.navigate('UpdateField', {
              fieldName: 'TELEFONE',
              placeholder: 'Digite seu telefone',
              value: profile.phone,
              type: 'phone',
            })
          }>
          <ButtonFieldContent>
            <FieldName>Telefone</FieldName>
            <FieldValue>{profile.phone || 'Sem telefone'}</FieldValue>
          </ButtonFieldContent>
          <Icon name="chevron-right" color="#999999" size={20} />
        </ButtonFiled>
        <ButtonFiled disabled>
          <ButtonFieldContent>
            <FieldName>CPF</FieldName>
            <FieldValue>{profile.cpf || 'Sem CPF'}</FieldValue>
          </ButtonFieldContent>
        </ButtonFiled>
        <ButtonFiled disabled>
          <ButtonFieldContent>
            <FieldName>CEP</FieldName>
            <FieldValue>{profile.cep || 'Sem CEP'}</FieldValue>
          </ButtonFieldContent>
        </ButtonFiled>
        <ButtonFiled disabled>
          <ButtonFieldContent>
            <FieldName>Complemento</FieldName>
            <FieldValue>{profile.complement || 'Sem complemento'}</FieldValue>
          </ButtonFieldContent>
        </ButtonFiled>
        <ButtonFiled disabled>
          <ButtonFieldContent>
            <FieldName>Número</FieldName>
            <FieldValue>{profile.number || 'Sem número'}</FieldValue>
          </ButtonFieldContent>
        </ButtonFiled>
        <ChangePassword onPress={() => navigation.navigate('ChangePassword')}>
          Mudar senha
        </ChangePassword>
        <Logout outline onPress={() => handleLogout()}>
          Sair
        </Logout>
      </Content>
    </Container>
  );
}

Profile.navigationOptions = {
  header: null,
};
