import React, { useState } from 'react';

import Rating from '../../components/Rating';

import {
    Container,
    Title,
    Top,
    Content,
} from './styles';

export default function ShowBook({ location }) {
    const { book } = location.state;

    function handleRatings(ratings) {
        if (ratings.length !== 0) {
            var sum = 0;

            ratings.map(rating => {
                sum += rating.value;
                return rating;
            });
            
            return sum/ratings.length;
        }
        
        return 0;
    }

    function handleAuthors(array) {
        var authors = [];

        array.map((item, index) => {
            authors[index] = item.name;
        })

        return authors.join(', ');
    }

    return (
        <Container>
            <Title>Detalhes do livro</Title>
            <Top>
                <img 
                    src={book.image.url}
                    alt={book.name}
                />
                <Content>
                    <h2>{book.name}</h2>
                    <span>{handleAuthors(book.authors)}</span>
                    <Rating 
                        size={20}
                        ratingValue={handleRatings(book.ratings)}
                        style={{ marginTop: 25, marginBottom: 25 }}
                    />
                    <span>Disponível: <strong>{book.available} exemplares</strong></span>
                </Content>
            </Top>
            <h2>Sinopse</h2>
            <p>{book.synopsis}</p>
        </Container>
    );
}