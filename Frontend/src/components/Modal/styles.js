import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width:  100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    display: ${props => !props.isOpened ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 400px;
    height: 220px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 30px 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.h3`

`;

export const ButtonContent = styled.div`
    display: flex;

`;

export const Yes = styled.button`
    flex: 1;
    height: 48px;
    color: #FFFFFF;
    background: #ed2b6c;
    font-weight: 600;
    border: 0;
    border-radius: 8px;
    font-size: 15.5px;
    transition: background 0.2s;
    width: 100%;

    &:hover {
        background: ${darken(0.05, '#ed2b6c')};
    }
`;

export const No = styled.button`
    flex: 1;
    height: 48px;
    color: #ed2b6c;
    background: #FFFFFF;
    font-weight: 600;
    border: 1px solid #ed2b6c;
    border-radius: 8px;
    font-size: 15.5px;
    transition: background 0.2s;
    width: 100%;
    margin-left: 20px;

    &:hover {
        background: ${darken(0.05, '#FFFFFF')};
    }
`;
