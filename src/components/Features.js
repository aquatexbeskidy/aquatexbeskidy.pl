// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as ArrowRight } from '../assets/icons/arrow_right.svg';
import { Link } from '~components';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Features = ({ features, title }) => {
  return (
    <Wrapper>
      {title && <Header>{title}</Header>}
      {features &&
        features.map(({ title, icon, link, desc }, index) => (
          <Inner key={index}>
            {icon && icon.includes('/icons/') && <Image alt={title} src={require(`../${icon}`)} />}
            <Title>{title}</Title>
            {link && (
              <Link to={link.url} look="primary">
                <Text>{link.title}</Text>
                <ArrowRight />
              </Link>
            )}
            {desc && <Description>{desc}</Description>}
          </Inner>
        ))}
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const BorderLineStyles = css`
  content: '';
  display: block;
  position: absolute;
  width: 70%;
  height: 1px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.05);
`;

const Header = styled.h2`
  flex-basis: 100%;
  text-align: center;
  margin-bottom: 80px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 50px 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  ${mq.min.tablet_base} {
    flex-direction: row;
  }
  &::before {
    ${BorderLineStyles};
    top: 0;
  }
  &::after {
    ${BorderLineStyles};
    bottom: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 50px;
    ${mq.min.tablet_base} {
      margin-right: 60px;
      margin-bottom: 0;
    }
    ${mq.min.desktop_small} {
      margin-right: 110px;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.color.black};
  width: 100%;
  max-width: 160px;
  text-align: center;
  margin: 20px 0;
  line-height: 20px;
  ${mq.min.tablet_base} {
    max-width: 120px;
    height: 40px;
  }
`;

const Text = styled.span`
  color: ${({ theme }) => theme.color.primary};
  margin-right: 5px;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
`;

const Description = styled.p`
  width: 100%;
  max-width: 210px;
  text-align: center;
  line-height: 30px;
  height: 100px;
  margin: 0;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Features.displayName = 'Features';

Features.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  link: PropTypes.string,
  desc: PropTypes.string,
};

Features.defaultProps = {
  title: '',
  iconName: '',
  link: '',
  desc: '',
};

export default Features;
