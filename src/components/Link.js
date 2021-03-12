// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { isExternalURL } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Link = ({ href, to, children, ...rest }) => {
  const link = href || to;

  const props = {
    external: {
      rel: 'noopener noreferrer',
      target: '_blank',
      ...rest,
    },
    internal: {
      activeClassName: 'is-active',
      ...rest,
    },
  };

  if (isExternalURL(link)) {
    return (
      <Anchor href={link} {...props.external}>
        {children}
      </Anchor>
    );
  }

  return (
    <Anchor as={GatsbyLink} to={link} {...props.internal}>
      {children}
    </Anchor>
  );
};

export default Link;

// ─────────────────────────────────────────────────────────────────────────────
// Commons
// ─────────────────────────────────────────────────────────────────────────────

const DefaultStyles = css`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.base};
  text-decoration: none;

  &:hover,
  &:focus,
  &:active,
  &.is-active {
    text-decoration: none;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Anchors Variants
// ─────────────────────────────────────────────────────────────────────────────

const AnchorPrimary = css`
  ${DefaultStyles};

  color: ${({ theme }) => theme.color.black};
`;

const AnchorSecondary = css`
  ${DefaultStyles};

  color: ${({ theme }) => theme.color.primary};
`;

// ─────────────────────────────────────────────────────────────────────────────
// Buttons Variants
// ─────────────────────────────────────────────────────────────────────────────

const DefaultButtonCss = css`
  ${DefaultStyles};

  font-weight: ${({ theme }) => theme.font.weight.medium};
  border-radius: 30px;
  padding: 12px 30px;
`;

const ButtonSecondary = css`
  --button-secondary-background: ${({ theme }) => theme.color.transparent};
  --button-secondary-border: ${({ theme }) => theme.color.white};
  --button-secondary-color: ${({ theme }) => theme.color.white};

  ${DefaultButtonCss};

  border: 2px solid var(--button-secondary-border);
  background: var(--button-secondary-background);
  color: var(--button-secondary-color);

  &:hover,
  &:focus,
  &:active,
  &.is-active {
    color: var(--button-secondary-color);
  }
`;

const ButtonTertiary = css`
  --button-tertiary-background: ${({ theme }) => theme.color.primary};
  --button-tertiary-border: ${({ theme }) => theme.color.primary};
  --button-tertiary-color: ${({ theme }) => theme.color.white};

  ${DefaultButtonCss}

  border: 2px solid var(--button-tertiary-border);
  background: var(--button-tertiary-background);
  color: var(--button-tertiary-color);

  &:hover,
  &:focus,
  &:active,
  &.is-active {
    color: var(--button-tertiary-color);
  }
`;

const ButtonPrimary = css`
  --button-primary-background: ${({ theme }) => theme.color.white};
  --button-primary-border: ${({ theme }) => theme.color.white};
  --button-primary-color: ${({ theme }) => theme.color.black};

  ${DefaultButtonCss};

  border: 2px solid var(--button-primary-border);
  background: var(--button-primary-background);
  color: var(--button-primary-color);

  &:hover,
  &:focus,
  &:active,
  &.is-active {
    color: var(--button-primary-color);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

export const Anchor = styled.a`
  ${({ look }) => look === 'secondary' && AnchorSecondary};
  ${({ look }) => look === 'primary' && AnchorPrimary};

  ${({ look }) => look === 'buttonSecondary' && ButtonSecondary};
  ${({ look }) => look === 'buttonTertiary' && ButtonTertiary};
  ${({ look }) => look === 'buttonPrimary' && ButtonPrimary};
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Link.displayName = 'Link';

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
};

Link.defaultProps = {
  href: null,
  to: null,
};
