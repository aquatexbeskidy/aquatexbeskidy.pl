// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as ArrowRight } from '../assets/icons/arrow_right.svg';
import { Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Features = ({ features }) => {
  return (
    <Wrapper>
      {features &&
        features.map(({ title, icon, link }, index) => (
          <Inner key={index}>
            {icon && icon.includes('/icons/') && <Image src={require(`../${icon}`)} />}
            <Title>{title}</Title>
            <Link to={link.url} look="primary">
              <span>{link.title}</span>
              <ArrowRight />
            </Link>
          </Inner>
        ))}
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Wrapper = styled.div``;

const Inner = styled.div``;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.black};
`;

const Image = styled.img`
  height: 25px;
  width: 25px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Features.displayName = 'Features';

Features.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  link: PropTypes.string,
};

Features.defaultProps = {
  title: '',
  iconName: '',
  link: '',
};

export default Features;
