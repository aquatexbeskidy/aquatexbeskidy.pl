// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React from 'react';

import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Nav = ({ links }) => (
  <NavStyled>
    <ul>
      {links.map(({ text, url }) => (
        <li key={url}>
          <Link to={url} look="primary">
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

    li:not(:last-child) {
      padding-right: 1rem;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Nav.displayName = 'Nav';
