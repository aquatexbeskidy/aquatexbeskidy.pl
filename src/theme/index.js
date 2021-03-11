import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export { LightTheme, DarkTheme, THEME_LABEL_LIGHT, THEME_LABEL_DARK } from './create';
export { default as mq } from './_breakpoints';
export { ThemeProvider } from './provider';
export { ThemeContext } from './context';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  h1, h2, h3 {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    /*
    --xs: ${({ theme }) => theme.font.size.xs};
    --lg: ${({ theme }) => theme.font.size.lg};
    --xl: ${({ theme }) => theme.font.size.xl};
    */

    /* https://developer.mozilla.org/en-US/docs/Web/CSS/clamp() */
    /* font-size: clamp(var(--xs), var(--lg), var(--xl)); */
    font-size: ${({ theme }) => theme.font.size.base};


    font-family: ${({ theme }) => theme.font.family.montserrat};
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};

    letter-spacing: 0;
  }

  a {
    color: ${({ theme }) => theme.color.text};

    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
