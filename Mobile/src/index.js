import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import App from './App';
import { store, persistor } from './store';

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle='light-content' backgroundColor='#ed2b6c'/>
                <App />
            </PersistGate>            
        </Provider>
    );
}
