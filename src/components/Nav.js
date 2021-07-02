// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React from 'react';

import { Link } from '~components';
import { animationKeyframesPercent } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const pulse = animationKeyframesPercent({
  start: {
    opacity: 1,
    transform: 'scale(1)',
  },
  middle: {
    opacity: 0.8,
    transform: 'scale(0.95)',
  },
  end: {
    opacity: 1,
    transform: 'scale(1)',
  },
  properties: '2000ms',
});

const Nav = ({ links }) => (
  <NavStyled>
    <ul>
      {links.map(({ icon, text, url, specialClass }) => (
        <li key={url} className={specialClass ? specialClass : ''}>
          <Link to={url} look="primary">
            {icon && <SocialIcon alt={text} src={require(`../${icon}`)} />}
            {text}
          </Link>
        </li>
      ))}
    </ul>
  </NavStyled>
);

export default Nav;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const NavStyled = styled.nav`
  ul {
    justify-content: space-between;
    align-items: center;
    display: flex;
    list-style: none;

    li {
      display: flex;
      &.is-pulse {
        a {
          color: ${({ theme }) => theme.color.danger};
          font-size: ${({ theme }) => theme.font.size.lg};
          font-weight: ${({ theme }) => theme.font.weight.semibold};
          animation: ${pulse} infinite;
          &:hover {
            animation-play-state: paused;
          }
        }
      }
    }

    li:not(:last-child) {
      padding-right: 1rem;
    }
  }
`;

const SocialIcon = styled.img`
  max-width: 100%;
  height: auto;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Nav.displayName = 'Nav';
