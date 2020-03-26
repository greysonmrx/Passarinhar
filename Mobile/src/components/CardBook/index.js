import React from 'react';
import Rating from '../Rating';

import {
    Container,
    Image,
    Content,
    Name,
    Synopsis,
} from './styles';

export default function CardBook({ data, onPress }) {
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
                <Synopsis>{data.synopsis}</Synopsis>
                <Rating 
                    size={15}
                    ratingValue={handleRatings()}
                />
            </Content>
        </Container>
    );
}