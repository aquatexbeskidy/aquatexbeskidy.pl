// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { getSrcSet } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { stringIncludesHTML, SIZE_HERO } from '~utils';
import { Link } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const Hero = ({ hero }) => {
  const { title, subtitle, image, buttons } = hero;
  const { childImageSharp } = image;

  const headingChildren = stringIncludesHTML(title)
    ? { dangerouslySetInnerHTML: { __html: title } }
    : { children: title };

  const subHeadingChildren = stringIncludesHTML(subtitle)
    ? { dangerouslySetInnerHTML: { __html: subtitle } }
    : { children: subtitle };

  const background = getSrcSet(childImageSharp).split(',')[2].split(' ')[0];

  return (
    <Wrapper style={{ backgroundImage: `url(${background})` }}>
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
  min-height: 400px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    padding: 10px 20px;
    &:not(:last-child) {
      margin-bottom: 20px;
      ${mq.min.tablet_base} {
        margin-right: 15px;
        margin-bottom: 0;
      }
    }
  }
  ${mq.min.tablet_base} {
    margin-bottom: 0;
    display: block;
    min-height: 500px;
  }
  ${mq.min.desktop_small} {
    margin-bottom: 0;
    display: block;
    min-height: ${height}px;
  }
`;

const SubHeading = styled.p`
  color: ${({ theme }) => theme.color.white};
  line-height: 30px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size.xxl};
  margin: 15px 0 40px;
  text-align: center;
  width: 100%;
  max-width: 230px;
  ${mq.min.tablet_base} {
    max-width: 100%;
    margin: 30px 0 50px;
    text-align: left;
  }
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.color.white};
  line-height: 50px;
  font-weight: 600;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.xxxxl};
  ${mq.min.tablet_base} {
    text-align: left;
  }
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
