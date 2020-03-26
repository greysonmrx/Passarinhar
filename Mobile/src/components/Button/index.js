import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, outline, disabled, ...rest }) {
    return (
        <Container {...rest} outline={outline} disabled={disabled}>
            {
                loading ? (
                    <ActivityIndicator size='small' color='#FFFFFF'/>
                ) : (
                    <Text outline={outline} disabled={disabled}>{children}</Text>
                )
            }
        </Container>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    loading: PropTypes.bool
}

Button.defaultProps = {
    loading: false
}