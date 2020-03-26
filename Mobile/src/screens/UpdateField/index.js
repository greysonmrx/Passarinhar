import React, { useState } from 'react';
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

export default function UpdateField({ navigation }) {
    const dispatch = useDispatch();

    const [value, setValue] = useState(navigation.getParam('value'));
    const [typeField, setFieldType] = useState(navigation.getParam('type'));
    const [errors, setErrors] = useState('');

    const defaultValue = navigation.getParam('value');

    function handleSubmit() {
        var object = new Object();

        switch (typeField) {
            case 'name': {
                if (!value) {
                    object.field = 'Preencha o campo de nome';
                } else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*$/.test(value)) {
                    object.field = 'Digite um nome válido';
                } else {
                    delete object.field;
                }

                setErrors(object);

                if (isEmpty(object)) {
                    dispatch(updateProfileRequest({ name: value }));
                    navigation.navigate('Profile');
                }
                
                break;
            };
            case 'email': {
                if (!value) {
                    object.field = 'Preencha o campo de e-mail';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    object.field = 'Digite um e-mail válido';
                } else {
                    delete object.field;
                }     

                setErrors(object);

                if (isEmpty(object)) {
                    dispatch(updateProfileRequest({ email: value }));
                    navigation.navigate('Profile');
                }                
                
                break;
            };
            case 'phone': {
                if (!value) {
                    object.field = 'Preencha o campo de telefone';
                } else if (!parseInt(value) || value.length < 11) {
                    object.field = 'Telefone inválido';
                } else {
                    delete object.field;
                }

                setErrors(object);

                if (isEmpty(object)) {
                    dispatch(updateProfileRequest({ phone: value }));
                    navigation.navigate('Profile');
                }

                break;
            };
            case 'password': {

            };
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
                placeholder={navigation.getParam('placeholder')}
                autoCorrect={false}
                value={value}
                onChangeText={setValue}
                keyboardType={typeField === 'email' ? 'email-address' : typeField === 'phone' ? 'numeric' : 'default'}
                autoCapitalize={typeField === 'name' ? 'sentences' : 'none'}
                onSubmitEditing={() => handleSubmit()}
                returnKeyType='send'
                maxLength={typeField === 'phone' ? 11 : 30}
                error={errors['field']}
            />
            <UpdateButton 
                disabled={value === defaultValue}
                onPress={() => handleSubmit()}
            >
                Salvar
            </UpdateButton>
        </Container>
    );
}

UpdateField.navigationOptions = ({ navigation }) => ({
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
        <Label style={{ fontSize: 15, flexGrow: 1, textAlign: 'center'}}>{navigation.getParam('fieldName')}</Label>
    ),
    headerTitleAlign: 'center'
})