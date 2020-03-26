import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Container,
    Button,
} from './styles';

export default function Rate({ getRate }) {
    const [rating, setRating] = useState([]);

    function handleRate(num) {
        var array = [false, false, false, false, false];

        for (var i = 0; i <= 4; i++) {
            if (i <= num) {
                array[i] = true;
            } else {
                array[i] = false;
            }            
        }

        setRating(array);

        var count = 0;

        for (var i = 0; i <= 4; i++) {
            if (array[i] === true) {
                count++;
            }           
        }

        getRate(count);
    }

    return (
        <Container>
            <Button onPress={() => handleRate(0)}>
                <Icon 
                    name={!rating[0] ? 'star-o': 'star'}
                    size={30}
                    color='#FBC02D'
                />
            </Button>
            <Button onPress={() => handleRate(1)}>
                <Icon 
                    name={!rating[1] ? 'star-o': 'star'}
                    size={30}
                    color='#FBC02D'
                />
            </Button>
            <Button onPress={() => handleRate(2)}>
                <Icon 
                    name={!rating[2] ? 'star-o': 'star'}
                    size={30}
                    color='#FBC02D'
                />
            </Button>
            <Button onPress={() => handleRate(3)}>
                <Icon 
                    name={!rating[3] ? 'star-o': 'star'}
                    size={30}
                    color='#FBC02D'
                />
            </Button>
            <Button onPress={() => handleRate(4)}>
                <Icon 
                    name={!rating[4] ? 'star-o': 'star'}
                    size={30}
                    color='#FBC02D'
                />
            </Button>
        </Container>
    );
}