// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import BackgroundImage from 'gatsby-background-image';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { stringIncludesHTML, SIZE_HERO } from '~utils';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const HeroSection = ({ title, subtitle, buttons, image, fluid }) => {
  const headingChildren = stringIncludesHTML(title)
    ? { dangerouslySetInnerHTML: { __html: title } }
    : { children: title };

  const subHeadingChildren = stringIncludesHTML(subtitle)
    ? { dangerouslySetInnerHTML: { __html: subtitle } }
    : { children: subtitle };

  const Wrapper = image ? HeroBackground : HeroWithoutBackground;

  return (
    <BackgroundImage fluid={fluid}>
      <Inner>
        {title && <Heading {...headingChildren} />}
        {subtitle && <SubHeading {...subHeadingChildren} />}

        {buttons &&
          buttons.map(({ title, link, type }, index) => (
            <Link to={link} look={type} key={index}>
              {title}
            </Link>
          ))}
      </Inner>
    </BackgroundImage>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const [width, height] = SIZE_HERO.split('x');

const common = css`
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

const HeroBackground = styled(BackgroundImage)`
  ${common}
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100%;
`;
const HeroWithoutBackground = styled.div`
  ${common}
`;

const Inner = styled.div`
  min-height: ${height}px;
  max-width: 100%;
  padding: 4vw;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #176ed370;
    z-index: -1;
  }
  a {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

const SubHeading = styled.p`
  color: ${({ theme }) => theme.color.white};
  line-height: 30px;
  font-weight: 500;
  font-size: 22px;
  margin: 30px 0 50px;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.color.white};
  line-height: 60px;
  font-weight: 600;
  font-size: 36px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

HeroSection.displayName = 'Hero';

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.bool,
};

HeroSection.defaultProps = {
  title: '',
  subtitle: '',
  buttons: [],
  image: true,
};

export default HeroSection;
