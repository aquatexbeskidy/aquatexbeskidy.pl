// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Toggler = ({ faq: { headline, list } }) => (
  <Wrapper>
    {headline && <Headline>{headline}</Headline>}
    {list &&
      list.map(({ title, content, icon }, index) => (
        <Item key={index}>
          <CheckBox type="checkbox" id={index} />

          <Title htmlFor={index}>
            {title}
            <Icon src={require(`../${icon}`)} />
          </Title>

          <ContentWrapper children={<Content>{content}</Content>} />
        </Item>
      ))}
  </Wrapper>
);

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const BorderLineStyles = css`
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
  padding: 40px 0;
  position: relative;
  &::before {
    ${BorderLineStyles};
    top: 0;
  }
  &::after {
    ${BorderLineStyles};
    bottom: 0;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const CheckBox = styled.input`
  display: none;
`;

const Icon = styled.img`
  width: 20px;
  margin-left: 10px;
  transition: all 0.2s ease;
`;

const Headline = styled.h2`
  text-align: center;
  margin: 20px 0 70px;
`;

const Title = styled.label`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.base};
  line-height: 25px;
  padding: 10px 0;
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${CheckBox}:checked ~ & {
    ${Icon} {
      transform: rotate(180deg);
    }
  }
`;

const ContentWrapper = styled.div`
  ${CheckBox}:not(:checked) ~ & {
    display: none;
  }
`;

const Content = styled.p`
  margin: 5px 0 0;
  max-width: 90%;
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: 25px;
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
