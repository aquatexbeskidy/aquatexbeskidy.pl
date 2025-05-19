// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import { mq } from '~theme';
import { stringIncludesHTML } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const MoreAdvantages = ({ moreAdvantages: { advantages, title } }) => {
  return (
    <Wrapper>
      {title && <Header>{title}</Header>}
      <AdvantagesList>
        {advantages.map(({ title, icon, desc, image }, index) => {
          const descChildren = stringIncludesHTML(desc)
            ? { dangerouslySetInnerHTML: { __html: desc } }
            : { children: desc };
          return (
            <AdvantageItem key={index}>
              {icon && icon.includes('/icons/') && (
                <Image alt={title} src={require(`../${icon}`)} />
              )}
              <div>
                <SubSmallHeading>{title}</SubSmallHeading>
                <Text {...descChildren} />
                {image && (
                  <GatsbyImage
                    image={getImage(image.childrenImageSharp[0])}
                    title={'Karta gwarancyjna'}
                    alt={'Karta gwarancyjna'}
                  />
                )}
              </div>
            </AdvantageItem>
          );
        })}
      </AdvantagesList>
    </Wrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const Header = styled.h2`
  flex-basis: 100%;
  text-align: center;
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.font.size.xxxl};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .gatsby-image-wrapper {
    margin: 0;
    img {
      object-fit: contain !important;
    }
  }

  ${mq.min.tablet_base} {
    flex-direction: row;
  }
`;

const Text = styled.p`
  line-height: 25px;
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.lg};
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
  strong {
    font-weight: ${({ theme }) => theme.font.weight.normal};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const SubSmallHeading = styled.h4`
  margin: 5px 0 0;
  font-size: ${({ theme }) => theme.font.size.xl};
`;

const Image = styled.img`
  height: 28px;
  width: 33px;

  ${mq.min.tablet_base} {
    height: 35px;
    width: 40px;
  }
`;

const AdvantagesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;

  div {
    margin-top: 20px;
    ${mq.min.tablet_base} {
      margin-left: 25px;
      margin-top: 0;
    }
  }

  a {
    display: flex;
    width: fit-content;
    margin: 25px auto 0;
  }
`;

const AdvantageItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  background: rgba(0, 0, 0, 0.01);
  margin-top: 20px;
  border-radius: 4px;

  ${mq.min.tablet_base} {
    padding: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

MoreAdvantages.displayName = 'MoreAdvantages';

MoreAdvantages.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  link: PropTypes.string,
  desc: PropTypes.string,
};

MoreAdvantages.defaultProps = {
  title: '',
  iconName: '',
  link: '',
  desc: '',
};

export default MoreAdvantages;
