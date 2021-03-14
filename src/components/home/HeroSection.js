// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import { getSrc } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import { stringIncludesHTML, SIZE_HERO } from '~utils';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const HeroSection = ({ title, subtitle, buttons, imageData }) => {
  const headingChildren = stringIncludesHTML(title)
    ? { dangerouslySetInnerHTML: { __html: title } }
    : { children: title };

  const subHeadingChildren = stringIncludesHTML(subtitle)
    ? { dangerouslySetInnerHTML: { __html: subtitle } }
    : { children: subtitle };

  const image = getSrc(imageData);

  return (
    <Wrapper style={{ backgroundImage: `url(${image})` }}>
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
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const [, height] = SIZE_HERO.split('x');

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;

  justify-content: flex-start;
  align-items: flex-start;
  display: flex;

  width: 100%;
`;

const Inner = styled.div`
  min-height: ${height}px;
  max-width: 100%;
  padding: 4vw;
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
