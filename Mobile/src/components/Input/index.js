import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Content, Container, TInput, Text } from './styles';

function Input({ style, icon, error, ...rest }, ref) {
    return (
        <Content style={style}>
            <Container error={error}>
                { icon && <Icon style={{ marginRight: 10 }} name={icon} size={20} color='#404040'/>}
                <TInput {...rest} ref={ref}/>
                {error && <Icon name='error' size={20} color='#D50000' />}       
            </Container>
            {error && <Text>{error}</Text>}
        </Content>
    );
}

Input.propTypes = {
    icon: PropTypes.string,
    ref: PropTypes.object,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Input.defaultProps = {
    icon: null,
    style: {}
};

export default forwardRef(Input);