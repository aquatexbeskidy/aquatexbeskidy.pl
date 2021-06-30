// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { keyframes, css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const animationKeyframesFromTo = ({ from = {}, to = {}, properties = '' } = {}) => {
  const setup = keyframes`
    from {${from}}
    to   {${to}}
  `;

  return css`
    ${setup} ${properties}
  `;
};

export const animationKeyframesPercent = ({
  start = {},
  middle = {},
  end = {},
  properties = '',
} = {}) => {
  const setup = keyframes`
    0% {${start}}
    50% {${middle}}
    100% {${end}}
  `;

  return css`
    ${setup} ${properties}
  `;
};
