import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const Container = styled.div`
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    background: #FFFFFF;
    width: 280px;
    max-width: 280px;
    min-width: 280px;
    padding: 25px 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    button {
        height: 48px;
        color: #FFFFFF;
        background: #ed2b6c;
        font-weight: 600;
        border: 0;
        border-radius: 8px;
        font-size: 15.5px;
        transition: background 0.2s;
        width: 100%;
        margin-top: 25px;

        &:hover {
            background: ${darken(0.05, '#ed2b6c')};
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 25px;

    img {
        border-radius: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

export const ProfileContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

export const Name = styled.span`
    color: #212121;
    font-size: 18px;
    font-weight: 900;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); 
    margin-bottom: 5px;
`;

export const Email = styled.span`
    color: #999999;
    font-size: 14px;
`;

export const LinkContent = styled.nav`
    display: flex;
    padding: 10px 0 10px 30px;
    align-items: center;

    span, svg {
        color: ${props => props.active ? '#ed2b6c' : '#b1b1b3'};
    }    
`;

export const Links = styled.div`
    padding: 10px 0 10px 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    max-height: calc(100% - 250px);
`;

export const LinkName = styled.span`
    font-size: 15px;
    margin-left: 15px;
`;

export const LinkTo = styled(Link)`
    margin: 10px;

    &&:hover span, &&:hover svg{
        color: #ed2b6c;
    }
`;

export const Scroll = styled(PerfectScrollBar)`
    max-height: 100%;
`;