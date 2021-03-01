import { light as lightColors, dark as darkColors, color as commonColors } from './_color';
import { breakpoint } from './_breakpoint';
import { font } from './_font';

export const THEME_LABEL_LIGHT = 'light';
export const THEME_LABEL_DARK = 'dark';

const createTheme = (theme) => {
  const themeColors = theme === THEME_LABEL_LIGHT ? lightColors : darkColors;

  const color = {
    ...commonColors,
    ...themeColors,
  };

  return {
    breakpoint,
    color,
    font,
  };
};

export const LightTheme = createTheme(THEME_LABEL_LIGHT);
export const DarkTheme = createTheme(THEME_LABEL_DARK);
