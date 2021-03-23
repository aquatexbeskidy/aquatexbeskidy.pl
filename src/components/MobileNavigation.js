// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import { useEventListener, useScrollLock } from '~hooks';
import { Nav, Hamburger } from '~components';
import { animationKeyframes } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const fade = animationKeyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
  properties: '200ms',
});

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
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 1rem;
      min-height: 5rem;
      &:last-child {
        padding-right: 1rem;
      }
      a {
        font-weight: ${({ theme }) => theme.font.weight.semibold};
      }
    }
  }
`;

const Portal = styled.div`
  background: rgb(255 255 255);
  min-height: 100vh;
  min-width: 100vw;
  animation: ${fade};
  padding: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;

  button {
    cursor: pointer;
    outline: none;
    position: fixed;
    padding: 0;
    right: 26px;
    top: 65px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

export default MobileNavigation;
