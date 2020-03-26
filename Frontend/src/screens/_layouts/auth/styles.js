import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    padding: 20px;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.12);
            border: 0;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            height: 44px;
            padding: 0 15px;
            margin: 0 0 10px;
            color: #404040;
            
            &::placeholder {
                color: #404040;
            }
        }

        span {
            color: #D50000;
            align-self: flex-start;
            margin: 0 0 10px 10px;
            font-size: 14px;
            font-weight: 700;
        }
    }
`;