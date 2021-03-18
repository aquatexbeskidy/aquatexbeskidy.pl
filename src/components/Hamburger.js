// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Hamburger = ({ onClickHandler, isActive }) => {
  const ref = useRef();

  return (
    <Button ref={ref} onClick={onClickHandler}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        {isActive ? (
          <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
        ) : (
          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        )}
      </svg>
    </Button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 0;

  display: none;
  ${mq.max.desktop_small} {
    display: block;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = {
  props: PropTypes.object,
  isActive: PropTypes.bool,
};

Hamburger.defaultProps = {
  props: {},
  isActive: false,
};

export default Hamburger;
