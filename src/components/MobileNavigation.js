// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import { useEventListener, useScrollLock } from '~hooks';
import { Nav, Hamburger } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const MobileNavigation = ({ links, onClose, isOpen }) => {
  const { enableScrollLock, disableScrollLock } = useScrollLock();

  useEventListener('keydown', (e) => {
    e.key === 'Escape' && e.preventDefault() && onClose();
  });

  useEffect(() => {
    if (isOpen) {
      enableScrollLock();
      return undefined;
    }
    disableScrollLock();
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <FocusLock>
      <Portal>
        <Hamburger onClickHandler={onClose} isActive={isOpen} />

        <Wrapper>
          <Nav links={links} />
        </Wrapper>
      </Portal>
    </FocusLock>,
    document.querySelector('#___gatsby'),
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  nav ul {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;

    padding: 0;
    margin: 0;

    li {
      padding: 0;
      min-height: 6rem;
    }
  }
`;

const Portal = styled.div`
  background: rgb(255 255 255 / 98%);
  min-height: 100vh;
  min-width: 100vw;
  padding: 10vw;

  position: fixed;
  z-index: 900;
  left: 0;
  top: 0;

  button {
    position: fixed;
    right: 0;
    top: 0;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

export default MobileNavigation;
