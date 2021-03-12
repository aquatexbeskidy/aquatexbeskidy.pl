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

const Hero = ({ title, subtitle, buttons, image, fluid }) => {
  const headingChildren = stringIncludesHTML(title)
    ? { dangerouslySetInnerHTML: { __html: title } }
    : { children: title };

  const subHeadingChildren = stringIncludesHTML(subtitle)
    ? { dangerouslySetInnerHTML: { __html: subtitle } }
    : { children: subtitle };

  const Wrapper = image ? HeroBackground : HeroWithoutBackground;

  return (
    <Wrapper {...(image && { fluid: fluid, Tag: 'section' })}>
      <Inner>
        {title && <Heading {...headingChildren} />}
        {subtitle && <SubHeading {...subHeadingChildren} />}

        {buttons &&
          buttons.map(({ title, link }, index) => (
            <Button to={link} look="primary" key={index}>
              {title}
            </Button>
          ))}
      </Inner>
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const [, height] = SIZE_HERO.split('x');

const common = css`
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

const HeroBackground = styled(BackgroundImage)`
  ${common}
`;
const HeroWithoutBackground = styled.div`
  ${common}
`;

const Inner = styled.div`
  min-height: ${height}px;
  max-width: 50vw;
  padding: 6vw;
`;

const SubHeading = styled.p`
  color: ${({ theme }) => theme.color.white};
  line-height: 30px;
  font-weight: 500;
  font-size: 20px;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.color.white};
  line-height: 46px;
  font-weight: 500;
  font-size: 36px;
`;

const Button = styled(Link)`
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  display: flex;
  border: 0;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Hero.displayName = 'Hero';

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.bool,
};

Hero.defaultProps = {
  title: '',
  subtitle: '',
  buttons: [],
  image: true,
};

export default Hero;
