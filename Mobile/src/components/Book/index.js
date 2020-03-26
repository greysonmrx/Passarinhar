import React, { useState } from 'react';
import Rating from '../Rating';

import { 
    Container,
    Image,
    Content,
    Name,
    Status,
} from './styles';

export default function Book({ data, onPress }) {
    function handleRatings() {
        if (data.ratings.length !== 0) {
            var sum = 0;

            data.ratings.map(rating => {
                sum += rating.value;
            });
            
            return sum/data.ratings.length;
        }
        
        return 0;
    }

    return (
        <Container onPress={onPress}>
            <Image 
                source={{ uri: data.image.url }}
                resizeMode='contain'
            />            
            <Content>
                <Name>{data.name}</Name>
                <Rating 
                    ratingValue={handleRatings()}
                    size={12}
                />
                <Status available={data.available !== 0}>{ data.available !== 0 ? 'Disponível' : 'Indisponível' }</Status>
            </Content>
        </Container>
    );
}