// ─────────────────────────────────────────────────────────────────────────────
// Breakpoints
// ─────────────────────────────────────────────────────────────────────────────

const breakpoints = {
  min: {
    mobile_small: `@media (min-width: 320px)`,
    mobile_base: `@media (min-width: 375px)`,
    mobile_big: `@media (min-width: 425px)`,
    tablet_base: `@media (min-width: 768px)`,
    tablet_big: `@media (min-width: 1024px)`,
    desktop_small: `@media (min-width: 1200px)`,
    desktop_base: `@media (min-width: 1440px)`,
    desktop_big: `@media (min-width: 1680px)`,
  },
  max: {
    mobile_small: `@media (max-width: 320px)`,
    mobile_base: `@media (max-width: 375px)`,
    mobile_big: `@media (max-width: 425px)`,
    tablet_base: `@media (max-width: 768px)`,
    tablet_big: `@media (max-width: 1024px)`,
    desktop_small: `@media (max-width: 1200px)`,
    desktop_base: `@media (max-width: 1440px)`,
    desktop_big: `@media (max-width: 1680px)`,
  },
};

export default breakpoints;
