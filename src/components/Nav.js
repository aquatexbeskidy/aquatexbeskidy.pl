// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { Link } from 'gatsby';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Nav = ({ links }) => (
  <NavStyled>
    <ul>
      {links.map(({ text, url }) => (
        <li key={url}>
          <Link to={url}>{text}</Link>
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
