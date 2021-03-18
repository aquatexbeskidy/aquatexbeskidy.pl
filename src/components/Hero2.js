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

const Hero2 = ({ hero2 }) => {
  const { heading, image, buttons } = hero2;
  const { childImageSharp } = image;

  const headingChildren = stringIncludesHTML(heading)
    ? { dangerouslySetInnerHTML: { __html: heading } }
    : { children: heading };

  const background = getSrcSet(childImageSharp).split(',')[2].split(' ')[0];

  return (
    <Wrapper style={{ backgroundImage: `url(${background})` }}>
      <Inner>
        {heading && <Heading {...headingChildren} />}

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
  margin-bottom: 80px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0 50px;
  a {
    padding-right: 40px;
    padding-left: 40px;
  }
  ${mq.min.tablet_base} {
    padding: 40px 0 70px;
  }
`;

const Heading = styled.h2`
  width: 100%;
  max-width: 580px;
  margin: 40px auto 30px;
  padding: 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 35px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Hero2.displayName = 'Hero2';

Hero2.propTypes = {
  heading: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.bool,
};

Hero2.defaultProps = {
  heading: '',
  buttons: [],
  image: true,
};

export default Hero2;
