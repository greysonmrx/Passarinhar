import React from 'react';

import {
    Text
} from './styles';

export default function Label({ children, style }) {
    return (
        <Text style={style}>{children}</Text>
    );
}