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
    flex: 1;
    padding: 10px 15px;
    justify-content: center;
`;

export const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-left: ${props => props.right ? '25' : '0'}px;

    input {
        background: #FFFFFF;
        border-radius: 8px;
        font-weight: 500;
        height: 46px;
        padding: 0 15px;
        border: none;
        outline: none;
        margin-left: 10px;
        font-size: 15px;
        color: #212121;
        width: 100%;
        
        &::placeholder {
            color: #404040;
        }
    }

    span {
        color: #D50000;
        align-self: flex-start;
        margin: 10px 0 0 10px;
        font-size: 14px;
        font-weight: 700;
    }
`;

export const InputContentArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;

    textarea {
        background: #FFFFFF;
        border-radius: 8px;
        font-weight: 500;
        height: 250px;
        padding: 15px;
        border: none;
        outline: none;
        margin-left: 10px;
        font-size: 15px;
        color: #212121;
        width: 100%;
        
        &::placeholder {
            color: #404040;
        }
    }

    span {
        color: #D50000;
        align-self: flex-start;
        margin: 10px 0 0 10px;
        font-size: 14px;
        font-weight: 700;
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