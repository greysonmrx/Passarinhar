import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { signUpRequest } from '../../store/modules/auth/actions';

import {
    ScrollContainer,
    Container,
    Logo,
    Form,
    FormInput,
    SubmitButton,
    SignInLink,
    SignInLinkText,
} from './styles';

import logo from '../../../assets/images/logo.jpg';

export default function Register({ navigation }) {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const cpfRef = useRef();
    const phoneRef = useRef();
    const cepRef = useRef();
    const numberRef = useRef();
    const complementRef = useRef();
    const passwordRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const loading = useSelector(state => state.auth.loading);

    async function handlerSubmit() {
        let object = new Object();
        let cepObject = new Object();

        if (!name) {
            object.name = 'Preencha o campo de nome';
        } else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*$/.test(name)) {
            object.name = 'Digite um nome válido';
        } else {
            delete object.name;
        }

        if (!email) {
            object.email = 'Preencha o campo de e-mail';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            object.email = 'Digite um e-mail válido';
        } else {
            delete object.email;
        }     

        if (!cpf) {
            object.cpf = 'Preencha o campo de CPF';
        } else if (cpf.length !== 11 || !handleCPF(cpf)) {
            object.cpf = 'CPF inválido';
        } else {
            delete object.cpf;
        }

        if (!cep) {
            object.cep = 'Preencha o campo de CEP';
        } else {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (cep.length !== 8 || !!response.data.erro) {
                object.cep = 'CEP inválido';
            } else {
                const { logradouro, bairro, localidade, uf } = response.data;

                cepObject.public_place = logradouro || 'Sem logradouro';
                cepObject.neighborhood = bairro || 'Sem bairro';
                cepObject.city = localidade || 'Sem localidade';
                cepObject.state = uf || 'Sem UF';

                delete object.cep;
            }
        }   

        if (!phone) {
            object.phone = 'Preencha o campo de telefone'
        } else if (!parseInt(phone) || phone.length < 11) {
            object.phone = 'Telefone inválido';
        } else {
            delete object.phone;
        }

        if (number && !parseInt(number)) {
            object.number = 'Número inválido';
        } else {
            delete object.number;
        }

        if (!password) {
            object.password = 'Preencha o campo de senha';
        } else if (password.length < 6) {
            object.password = 'A senha deve ter no mínimo 6 caracteres';
        } else {
            delete object.password;
        }

        const { public_place, neighborhood, city, state } = cepObject;

        setErrors(object);

        if (isEmpty(object)) {
            dispatch(signUpRequest(name, email, password, cpf, cep, number, complement, public_place, neighborhood, city, state, phone));
        }
    }

    function isEmpty(object) {
        for (const key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }

        return true;
    }

    function handleCPF(value) {
        var Soma = 0;
        var Resto = 0;

        if (value == "00000000000") {
            return false;
        } 

        for (var i = 1; i <= 9; i++) { 
            Soma = Soma + parseInt(value.substring(i-1, i)) * (11 - i); 
        }

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) {
            Resto = 0;
        }  

        if (Resto != parseInt(value.substring(9, 10))) {
            return false;
        } 

        Soma = 0;

        for (var i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(value.substring(i-1, i)) * (12 - i);
        } 

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) {
            Resto = 0;
        } 

        if (Resto != parseInt(value.substring(10, 11))) {
            return false;
        } 

        return true;
    }

    return (
        <ScrollContainer>
            <Container>
                <Logo source={logo}/>
                <Form>
                    <FormInput 
                        icon='face'
                        autoCorrect={false}
                        placeholder='Digite seu nome completo'
                        onChangeText={setName}
                        maxLength={30}
                        autoCapitalize='words'
                        onSubmitEditing={() => emailRef.current.focus()}
                        returnKeyType='next'
                        error={errors['name']}
                    />

                    <FormInput 
                        icon='mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholder='Digite seu email'
                        onChangeText={setEmail}
                        ref={emailRef}
                        onSubmitEditing={() => cpfRef.current.focus()}
                        returnKeyType='next'
                        error={errors['email']}
                    />

                    <FormInput 
                        icon='label'
                        placeholder='Digite seu CPF'
                        onChangeText={setCpf}
                        ref={cpfRef}
                        maxLength={11}
                        keyboardType='numeric'
                        onSubmitEditing={() => phoneRef.current.focus()}
                        returnKeyType='next'
                        error={errors['cpf']}
                    />

                    <FormInput 
                        icon='local-phone'
                        placeholder='Telefone celular'
                        onChangeText={setPhone}
                        ref={phoneRef}
                        maxLength={11}
                        keyboardType='numeric'
                        onSubmitEditing={() => cepRef.current.focus()}
                        returnKeyType='next'
                        error={errors['phone']}
                    />

                    <FormInput 
                        icon='location-on'
                        placeholder='Digite seu CEP'
                        onChangeText={setCep}
                        ref={cepRef}
                        maxLength={8}
                        keyboardType='numeric'
                        onSubmitEditing={() => numberRef.current.focus()}
                        returnKeyType='next'
                        error={errors['cep']}
                    />

                    <FormInput 
                        icon='home'
                        placeholder='Número'
                        onChangeText={setNumber}
                        ref={numberRef}
                        keyboardType='numeric'
                        onSubmitEditing={() => complementRef.current.focus()}
                        returnKeyType='next'
                        error={errors['number']}
                    />

                    <FormInput 
                        icon='receipt'
                        placeholder='Complemento'
                        onChangeText={setComplement}
                        ref={complementRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        returnKeyType='next'
                        error={errors['complemento']}
                    />

                    <FormInput 
                        icon='vpn-key'
                        secureTextEntry={true}
                        placeholder='Digite sua senha'
                        onChangeText={setPassword}
                        ref={passwordRef}
                        onSubmitEditing={handlerSubmit}
                        returnKeyType='send'
                        error={errors['password']}
                    />

                    <SubmitButton
                        onPress={handlerSubmit}
                        loading={loading}
                    >Cadastrar</SubmitButton>
                </Form>
                <SignInLink onPress={() => navigation.navigate('Login')}>
                    <SignInLinkText>Já possui uma conta? Entre agora!</SignInLinkText>
                </SignInLink>
            </Container>
        </ScrollContainer>
    );
}