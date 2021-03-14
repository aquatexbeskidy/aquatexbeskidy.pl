// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const Toggler = ({ toggleItems }) => {
  return (
    <ToggleContainer>
      {toggleItems &&
        toggleItems.map(({ title, content, icon }, index) => (
          <ToggleItem key={index}>
            <CheckBox type="checkbox" id={index} />
            <Title htmlFor={index}>
              {title}
              <ToggleIcon src={require(`../${icon}`)} />
            </Title>
            <ContentWrapper>
              <Content>{content}</Content>
            </ContentWrapper>
          </ToggleItem>
        ))}
    </ToggleContainer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const ToggleContainer = styled.div`
  width: 100%;
`;

const ToggleItem = styled.div`
  width: 100%;
`;

const CheckBox = styled.input`
  display: none;
`;

const ToggleIcon = styled.img`
  width: 20px;
`

const Title = styled.label`
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${CheckBox}:checked ~ & {
    ${ToggleIcon} {
      transform: rotate(180deg);
    }
  }
`;

const ContentWrapper = styled.div`
  ${CheckBox}:not(:checked) ~ & {
    display: none;
  }
`;

const Content = styled.p``;

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
