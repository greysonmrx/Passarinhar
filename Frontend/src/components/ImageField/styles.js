import styled from 'styled-components';

export const Container = styled.div`
    align-self: center;
    margin-bottom: 30px;

    label {
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        img {
            height: 200px;
            width: 140px;
            border: 3px solid #ed2b6c;
            background: #EEEEEE;
        }

        input {
            display: none;
        }
    }
`;