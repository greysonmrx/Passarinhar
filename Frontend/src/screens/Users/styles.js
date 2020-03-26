import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

export const SearchContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
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

export const Table = styled.table`
    background: #FFFFFF;
    width: 100%;
    padding: 0px 25px 20px 25px;
    border-radius: 10px;

    th {
        text-align: left;
        padding: 20px 8px;
        color: #999999;
        font-size: 16px;
    }

    td {
        text-align: left;
        padding: 8px 15px;
    }

    img {
        border-radius: 10px;
    }
`;

export const ActionContent = styled.div`
    display: flex;
`;

export const Action = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: none;
    background: #e53935;
`;

export const Scroll = styled(PerfectScrollbar)`
    max-height: calc(100% - 150px);
`;