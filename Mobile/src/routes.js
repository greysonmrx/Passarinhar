import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

import Main from './screens/Main';
import Library from './screens/Library';
import Profile from './screens/Profile';
import UpdateField from './screens/UpdateField';
import ChangePassword from './screens/ChangePassword';
import BookDetails from './screens/BookDetails';

import Label from './components/Label';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default (isSigned = false) => createAppContainer(
    createSwitchNavigator({
        Sign: createSwitchNavigator({
            Welcome,
            Login,
            Register
        }),
        App: createMaterialBottomTabNavigator({
            Main: createStackNavigator({
                Main,
                BookDetails
            }, {
                navigationOptions: {
                    tabBarLabel: <Label>Página inicial</Label>,
                    tabBarIcon: ({ tintColor }) => (
                        <Icon style={{ marginTop: -4 }} name='home-variant-outline' size={26} color={tintColor} />
                    )
                }                    
            }),
            Library: createStackNavigator({
                Library
            }, {
                navigationOptions: {
                    tabBarLabel: <Label>Biblioteca</Label>,
                    tabBarIcon: ({ tintColor }) => (
                        <Icon style={{ marginTop: -4 }} name='file-document-box-multiple-outline' size={23} color={tintColor} />
                    )
                }  
            }),
            Profile: createStackNavigator({
                Profile,
                UpdateField,
                ChangePassword
            }, {
                navigationOptions: {
                    tabBarLabel: <Label>Meu perfil</Label>,
                    tabBarIcon: ({ tintColor }) => (
                        <Icon style={{ marginTop: -4 }} name='account-outline' size={27} color={tintColor} />
                    )
                }                    
            })
        }, {
            barStyle: { 
                backgroundColor: '#FFFFFF'
            },
            activeColor: '#ed2b6c'
        })
    }, {
        initialRouteName: isSigned ? 'App' : 'Sign'
    })
)