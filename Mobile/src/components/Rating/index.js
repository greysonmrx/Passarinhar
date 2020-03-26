import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Container
} from './styles';

export default function Rating({ size, ratingValue, style }) {
    function renderStars() {
        var count = 0;
        var index = 0;
        var starElements = [];

        while (index !== 5) {
            if (count < ratingValue) {
                if (ratingValue - count < 1) {
                    if (ratingValue - count >= 0.5) {
                        count++;

                        starElements.push(
                            <Icon 
                                key={String(index)}
                                style={{ marginRight: index === 4 ? 0 : 3 }}
                                name='star-half-full'
                                size={size}
                                color='#FBC02D'
                            />
                        );
                    } else {
                        count++;

                        starElements.push(
                            <Icon  
                                key={String(index)}
                                style={{ marginRight: index === 4 ? 0 : 3 }}
                                name='star-o'
                                size={size}
                                color='#FBC02D'
                            />
                        );
                    }                    
                } else {
                    count++;

                    starElements.push(
                        <Icon  
                            key={String(index)}
                            style={{ marginRight: index === 4 ? 0 : 3 }}
                            name='star'
                            size={size}
                            color='#FBC02D'
                        />
                    );
                }                
            } else {
                starElements.push(
                    <Icon  
                        key={String(index)}
                        style={{ marginRight: index === 4 ? 0 : 3 }}
                        name='star-o'
                        size={size}
                        color='#FBC02D'
                    />
                );
            }

            index++;
        }

        return starElements;
    }

    return (
        <Container style={style}>
            {
                ratingValue === 0 ? (
                    <>
                        <Icon
                            style={{ marginRight: 3 }}
                            name='star'
                            size={size}
                            color='#DDDDDD'
                        />
                        <Icon
                            style={{ marginRight: 3 }}
                            name='star'
                            size={size}
                            color='#DDDDDD'
                        />
                        <Icon
                            style={{ marginRight: 3 }}
                            name='star'
                            size={size}
                            color='#DDDDDD'
                        />
                        <Icon
                            style={{ marginRight: 3 }}
                            name='star'
                            size={size}
                            color='#DDDDDD'
                        />
                        <Icon
                            name='star'
                            size={size}
                            color='#DDDDDD'
                        />
                    </>
                ) : renderStars()
            }
        </Container>
    );
}