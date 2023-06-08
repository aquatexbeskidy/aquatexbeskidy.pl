// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import CountUp from 'react-countup';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const CountMeUp = ({ homeCountUp }) => {
  const { title, count, icon } = homeCountUp;

  return (
    <Wrapper>
      {icon && icon.includes('/icons/') && (
        <Inner>
          <Image alt={title} src={require(`../${icon}`)} />
        </Inner>
      )}
      {count > 0 && <CountUp end={count} start={0} />}
      {title && <Header>{title}</Header>}
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
  height: 2px;
  border-radius: 2px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.05);

  ${mq.min.desktop_small} {
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.color.primary};
  }
`;

const Header = styled.h2`
  flex-basis: 100%;
  text-align: center;
  margin: 20px 0 0;

  ${mq.min.desktop_small} {
    margin: 15px 0 40px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${mq.min.desktop_small} {
    background-color: rgba(0, 0, 0, 0.01);
  }

  &::before {
    ${BorderLineStyles};
    left: 50%;
    top: 0;
    transform: translateX(-50%);

    ${mq.min.desktop_small} {
      left: 0;
    }
  }

  &::after {
    ${BorderLineStyles};
    display: none;

    ${mq.min.desktop_small} {
      right: 0;
      display: block;
    }
  }

  span {
    font-size: ${({ theme }) => theme.font.size.xxxxl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Inner = styled.div`
  margin: 40px 0 25px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;

  ${mq.min.tablet_base} {
    height: 60px;
    width: 60px;
  }

  ${mq.min.tablet_big} {
    height: 65px;
    width: 65px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

CountMeUp.displayName = 'CountMeUp';

CountMeUp.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  count: PropTypes.number,
};

CountMeUp.defaultProps = {
  title: '',
  icon: '',
  count: 0,
};

export default CountMeUp;
