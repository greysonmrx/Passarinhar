import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {signInRequest} from '../../store/modules/auth/actions';

import {
  Container,
  Logo,
  Form,
  FormInput,
  SubmitButton,
  SignUpLink,
  SignUpLinkText,
} from './styles';

import logo from '../../../assets/images/logo.jpg';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const passwordRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit() {
    let object = new Object();

    if (!email) {
      object.email = 'Preencha o campo de e-mail';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      object.email = 'Digite um e-mail válido';
    } else {
      delete object.email;
    }

    if (!password) {
      object.password = 'Preencha o campo de senha';
    } else if (password.length < 6) {
      object.password = 'A senha deve ter no mínimo 6 caracteres';
    } else {
      delete object.password;
    }

    setErrors(object);

    if (isEmpty(object)) {
      dispatch(signInRequest(email, password));
    }
  }

  function isEmpty(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) return false;
    }

    return true;
  }

  return (
    <Container>
      <Logo source={logo} />
      <Form>
        <FormInput
          icon="mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setEmail}
          placeholder="Digite seu email"
          error={errors['email']}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <FormInput
          icon="vpn-key"
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          error={errors['password']}
          returnKeyType="send"
          ref={passwordRef}
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar
        </SubmitButton>
      </Form>
      <SignUpLink onPress={() => navigation.navigate('Register')}>
        <SignUpLinkText>Ainda não possui uma conta? Crie agora!</SignUpLinkText>
      </SignUpLink>
    </Container>
  );
}
