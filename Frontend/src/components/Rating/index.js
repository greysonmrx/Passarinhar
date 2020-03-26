import React from 'react';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

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
                            <TiStarHalfOutline 
                                key={String(index)}
                                style={{ marginRight: index === 4 ? 0 : 3 }}
                                size={size}
                                color='#FBC02D'
                            />
                        );
                    } else {
                        count++;

                        starElements.push(
                            <TiStarFullOutline  
                                key={String(index)}
                                style={{ marginRight: index === 4 ? 0 : 3 }}
                                size={size}
                                color='#FBC02D'
                            />
                        );
                    }                    
                } else {
                    count++;

                    starElements.push(
                        <TiStarFullOutline  
                            key={String(index)}
                            style={{ marginRight: index === 4 ? 0 : 3 }}
                            size={size}
                            color='#FBC02D'
                        />
                    );
                }                
            } else {
                starElements.push(
                    <TiStarOutline  
                        key={String(index)}
                        style={{ marginRight: index === 4 ? 0 : 3 }}
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
                        <TiStarFullOutline
                            style={{ marginRight: 3 }}
                            size={size}
                            color='#DDDDDD'
                        />
                        <TiStarFullOutline
                            style={{ marginRight: 3 }}
                            size={size}
                            color='#DDDDDD'
                        />
                        <TiStarFullOutline
                            style={{ marginRight: 3 }}
                            size={size}
                            color='#DDDDDD'
                        />
                        <TiStarFullOutline
                            style={{ marginRight: 3 }}
                            size={size}
                            color='#DDDDDD'
                        />
                        <TiStarFullOutline
                            size={size}
                            color='#DDDDDD'
                        />
                    </>
                ) : renderStars()
            }
        </Container>
    );
}