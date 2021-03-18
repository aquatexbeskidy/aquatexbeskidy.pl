// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const TogglerItem = ({ title, content, icon }, index) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Item
      onClick={() => setToggle((prev) => !prev)}
      className={toggle ? 'is-active' : ''}
      key={index}
    >
      <Title>
        {title}
        <Icon src={require(`../${icon}`)} />
      </Title>

      <Content>{content}</Content>
    </Item>
  );
};

const Toggler = ({ faq: { headline, list } }) => (
  <Wrapper>
    {headline && <Headline>{headline}</Headline>}
    {list && list.map(TogglerItem)}
  </Wrapper>
);

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const borderLineStyles = css`
  content: '';
  display: block;
  position: absolute;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 40px 20px;
  position: relative;
  &::before {
    ${borderLineStyles};
    top: 0;
  }
  &::after {
    ${borderLineStyles};
    bottom: 0;
  }
`;

const Icon = styled.img`
  width: 15px;
  margin-left: 15px;
  transition: all 0.2s ease;
  ${mq.min.tablet_base} {
    width: 20px;
  }
`;

const Headline = styled.h2`
  text-align: center;
  margin: 20px 0 70px;
`;

const Title = styled.div`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.base};
  justify-content: space-between;
  align-items: center;
  user-select: none;
  line-height: 25px;
  padding: 10px 0;
  display: flex;
  width: 100%;
`;

const Content = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: 25px;
  margin: 5px 0 0;
  max-width: 90%;
`;

const Item = styled.div`
  padding: 10px 0;
  width: 100%;
  &.is-active {
    ${Icon} {
      transform: rotate(180deg);
    }
    ${Title} {
      text-decoration: underline;
    }
  }
  &:not(.is-active) {
    ${Content} {
      display: none;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

Toggler.displayName = 'Toggler';

Toggler.propTypes = {
  title: PropTypes.string,
  contet: PropTypes.string,
  icon: PropTypes.string,
};

Toggler.defaultProps = {
  title: '',
  content: '',
  icon: '',
};

export default Toggler;
