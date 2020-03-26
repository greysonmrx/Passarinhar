import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;    
    flex-direction: column;
    padding: 50px 30px;

    h2 {
        margin-bottom: 25px;
    }

    p {
        line-height: 25px;
    }
`;

export const Top = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    margin-bottom: 50px;

    img {
        height: 250px;
        width: 170px;
    }
`;

export const Content = styled.div`
    margin-left: 50px;

    h2 {
        margin-bottom: 25px;
    }

    span {
        margin-bottom: 20px;
    }
`;

export const Title = styled.h1`
    font-size: 35px;
    font-weight: 800;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 
`;