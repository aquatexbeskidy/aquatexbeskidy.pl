// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { ThemeContext, GlobalStyle } from '~theme';
import { useTheme, getTheme } from '~hooks';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useTheme();
  const currentTheme = getTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <>
          <GlobalStyle />
          {children}
        </>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
