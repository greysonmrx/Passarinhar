import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateProfileRequest } from '../../store/modules/user/actions';

import {
    Container,
    Field,
    UpdateButton,
} from './styles';

import Label from '../../components/Label';

export default function ChangePassword({ navigation }) {
    const dispatch = useDispatch();

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    function handleSubmit() {
        var object = new Object();

        if (oldPassword.length < 6) {
            object.oldPassword = 'A senha deve ter no mínimo 6 caracteres';
        } else {
            delete object.oldPassword;
        }
        
        if (password.length < 6) {
            object.password = 'A senha deve ter no mínimo 6 caracteres';
        } else if (password !== confirmPassword) {
            object.password = 'As senhas não coincidem';
        } else {
            delete object.password;
        }
        
        if (confirmPassword.length < 6) {
            object.confirmPassword = 'A senha deve ter no mínimo 6 caracteres';
        } else if (password !== confirmPassword) {
            object.confirmPassword = 'As senhas não coincidem';
        } else {
            delete object.confirmPassword;
        }

        setErrors(object);

        if (isEmpty(object)) {
            dispatch(updateProfileRequest({ oldPassword, password }));
            navigation.navigate('Profile');
        }
    }

    function isEmpty(object) {
        for (const key in object) {
            if (object.hasOwnProperty(key))
                return false;
        }

        return true;
    }

    return (
        <Container>
            <Field 
                placeholder='Digite sua senha atual'
                autoCorrect={false}
                onChangeText={setOldPassword}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType='next'
                error={errors['oldPassword']}
            />
            <Field 
                placeholder='Digite sua nova senha'
                autoCorrect={false}
                onChangeText={setPassword}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                returnKeyType='next'
                ref={passwordRef}
                error={errors['password']}
            />
            <Field 
                placeholder='Confirmação da nova senha'
                autoCorrect={false}
                onChangeText={setConfirmPassword}
                onSubmitEditing={() => handleSubmit()}
                returnKeyType='send'
                ref={confirmPasswordRef}
                error={errors['confirmPassword']}
            />
            <UpdateButton 
                disabled={!password || !oldPassword || !confirmPassword}
                onPress={() => handleSubmit()}
            >
                Salvar
            </UpdateButton>
        </Container>
    );
}

ChangePassword.navigationOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ padding: 10 }}
        >
            <Icon name='chevron-left' size={30} color='#ed2b6c' />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity
            style={{ padding: 10 }}
        >
            <Icon name='chevron-left' size={30} color='rgba(0, 0, 0, 0)' />
        </TouchableOpacity>
    ),
    headerTitle: () => (
        <Label style={{ fontSize: 15, flexGrow: 1, textAlign: 'center'}}>MUDAR SENHA</Label>
    ),
    headerTitleAlign: 'center'
})