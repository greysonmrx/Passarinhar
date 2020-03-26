import { createGlobalStyle } from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,500,600,700,900&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    *:focus {
        outline: none;
    }

    html, body, #root {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    body {
        -webkit-smoothing: antialiased;
        height: 100%;
    }

    body, button, input, textarea {
        font-family: 'Lato';
    }

    svg {
        color: #b1b1b3;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
    }
`;
