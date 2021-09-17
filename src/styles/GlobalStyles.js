import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
      background-color: rgb(231, 234, 246);
    }
    a {
        text-decoration:none;
        color:inherit
    }
    * {
        box-sizing:border-box
    }
    button {
        cursor: pointer;
    }
`;

export default GlobalStyles;
