import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const Container = styled.div`
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    background: #FFFFFF;
    width: 400px;
    padding: 25px 10px;
    margin-right: ${props => props.margin}px;
    transition: all .5s ease-in-out;
    z-index: 2;
`;

export const NotificationButton = styled.button`
    position: absolute;
    top: 60px;
    right: 30px;
    background: none;
    border: none;
`;

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px 40px 10px;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 25px;
    color: #212121;
    font-weight: 800;
    position: relative;

    ${props => props.unRead && css`
        &::after {
            position: absolute;
            right: -11px;
            top: 2px;
            width: 8px;
            height: 8px;
            background: #ed2b6c;
            content: '';
            border-radius: 100%;
        }
    `}
`;

export const Button = styled.button`
    background: transparent;
    border: none;
`;

export const NotificationList = styled.div`
    padding: 0 10px;
    height: calc(100% - 80px);
`;

export const Notification = styled.div`
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    img {
        min-width: 30px;
        min-height: 30px;
        max-width: 30px;
        max-height: 30px;
        border-radius: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    div {
        padding: 0 10px;
    }

    span {
        color: #212121;
        font-size: 14px;
        font-weight: 700;
    }

    p {
        margin: 8px 0 5px 0;
        color: #999999;
        font-size: 14px;
        font-weight: 700;
    }

    time {
        color: #999999;
        font-size: 14px;
    }

    section {
    }

    button {
        background: none;
        border: none;    
        color: #ed2b6c;
        margin-top: 10px;
        font-weight: 700;
    }
`;

export const Scroll = styled(PerfectScrollBar)`
    max-height: 100%;
`;