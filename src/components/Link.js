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
// Variants
// ─────────────────────────────────────────────────────────────────────────────

const DefaultStyles = css`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.base};
  text-decoration: none;
`;

const DefaultAnchorCss = css`
  ${DefaultStyles}
  &:hover,
  &:focus,
  &:active,
  &.is-active {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: none;
  }
`;

const DefaultButtonCss = css`
  ${DefaultStyles}
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  ${({ look }) => {
    if (look === 'buttonPrimary') {
      return css`
        color: ${({ theme }) => theme.color.black};
        background: ${({ theme }) => theme.color.white};
        border: 2px solid ${({ theme }) => theme.color.white};
        &:hover,
        &:focus,
        &:active,
        &.is-active {
          color: ${({ theme }) => theme.color.black};
          text-decoration: none;
        }
      `;
    } else if (look === 'buttonSecondary') {
      return css`
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.color.transparent};
        border: 2px solid ${({ theme }) => theme.color.white};
        &:hover,
        &:focus,
        &:active,
        &.is-active {
          color: ${({ theme }) => theme.color.white};
          text-decoration: none;
        }
      `;
    } else {
      return css`
        color: ${({ theme }) => theme.color.white};
        background: ${({ theme }) => theme.color.primary};
        border: 2px solid ${({ theme }) => theme.color.primary};
        &:hover,
        &:focus,
        &:active,
        &.is-active {
          color: ${({ theme }) => theme.color.white};
          text-decoration: none;
        }
      `;
    }
  }}
`;

const AnchorPrimary = css`
  ${DefaultAnchorCss}
`;

const AnchorSecondary = css`
  ${DefaultAnchorCss}
`;

const AnchorTertiary = css`
  ${DefaultAnchorCss}
`;

const ButtonPrimary = css`
  ${DefaultButtonCss}
`;

const ButtonSecondary = css`
  ${DefaultButtonCss}
`;

const ButtonTertiary = css`
  ${DefaultButtonCss}
`;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

export const Anchor = styled.a`
  ${({ look }) => look === 'secondary' && AnchorSecondary};
  ${({ look }) => look === 'tertiary' && AnchorTertiary};
  ${({ look }) => look === 'primary' && AnchorPrimary};
  ${({ look }) => look === 'buttonPrimary' && ButtonPrimary};
  ${({ look }) => look === 'buttonSecondary' && ButtonSecondary};
  ${({ look }) => look === 'buttonTertiary' && ButtonTertiary};
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
