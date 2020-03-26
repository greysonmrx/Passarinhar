import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;    
    flex-direction: column;
    padding: 50px 30px;
`;

export const Title = styled.h1`
    font-size: 35px;
    font-weight: 800;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 
`;

export const Content = styled.div`
    width: 100%;
    margin-top: 50px;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    background: #FFFFFF;
    flex: 1;
    padding: 10px 15px;
    border-radius: 8px;
    height: 45px;

    input {
        background: none;
        border: none;
        outline: none;
        height: 100%;
        margin-left: 10px;
        font-size: 15px;
        color: #212121;
        width: 100%;
    }
`;

export const ButtonAdd = styled.button`
    display: flex;
    align-items: center;
    background: #ed2b6c;
    padding: 0px 15px;
    border-radius: 10px;
    height: 45px;
    border: none;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
`;