// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints
// ─────────────────────────────────────────────────────────────────────────────

export const mobile_small = '320';
export const mobile_base = '375';
export const mobile_big = '425';
export const tablet_base = '768';
export const tablet_big = '1024';
export const desktop_small = '1200';
export const desktop_base = '1440';
export const desktop_big = '1680';

const breakpoints = {
  min: {
    mobile_small: `@media (min-width: ${mobile_small}px)`,
    mobile_base: `@media (min-width: ${mobile_base}px)`,
    mobile_big: `@media (min-width: ${mobile_big}px)`,
    tablet_base: `@media (min-width: ${tablet_base}px)`,
    tablet_big: `@media (min-width: ${tablet_big}px)`,
    desktop_small: `@media (min-width: ${desktop_small}px)`,
    desktop_base: `@media (min-width: ${desktop_base}px)`,
    desktop_big: `@media (min-width: ${desktop_big}px)`,
  },
  max: {
    mobile_small: `@media (max-width: ${parseInt(mobile_small - 1)}px)`,
    mobile_base: `@media (max-width: ${parseInt(mobile_base - 1)}px)`,
    mobile_big: `@media (max-width: ${parseInt(mobile_big - 1)}px)`,
    tablet_base: `@media (max-width: ${parseInt(tablet_base - 1)}px)`,
    tablet_big: `@media (max-width: ${parseInt(tablet_big - 1)}px)`,
    desktop_small: `@media (max-width: ${parseInt(desktop_small - 1)}px)`,
    desktop_base: `@media (max-width: ${parseInt(desktop_base - 1)}px)`,
    desktop_big: `@media (max-width: ${parseInt(desktop_big - 1)}px)`,
  },
};

export default breakpoints;
