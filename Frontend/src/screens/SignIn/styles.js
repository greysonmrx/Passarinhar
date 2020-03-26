import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
    margin: 5px 0 0;
    height: 53px;
    color: #FFFFFF;
    background: ${props => props.disabled ? '#999999' : '#ed2b6c'};
    font-weight: 600;
    border: 0;
    border-radius: 8px;
    font-size: 15.5px;
    transition: background 0.2s;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover {
        background: ${props => props.disabled ? '#999999' : darken(0.05, '#ed2b6c')};
    }
`;