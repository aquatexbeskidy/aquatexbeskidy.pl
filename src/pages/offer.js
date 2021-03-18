// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { Reviews } from '~components';
import { Wrapper, Review } from '~components/Reviews';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const OfferPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        offer: { mainTitle, mainContent, subContent, subTitle, offerList, reviewImgList },
      },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <OfferWrapper>
      <Heading>{mainTitle}</Heading>
      <Text>{mainContent}</Text>
      <Text>{subContent}</Text>
      <SubHeading>{subTitle}</SubHeading>
      <OfferList>
        {offerList.map(({ title, price }, index) => (
          <Item key={index}>
            <Description>{title}</Description>
            <Price>{price}</Price>
          </Item>
        ))}
      </OfferList>
      <Reviews reviews={reviewImgList} />
    </OfferWrapper>
  </RootContainer>
);

export default OfferPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const OfferWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  ${Wrapper} {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${Review} {
      display: flex;
      padding: 0;
    }
    ${mq.min.mobile_big} {
      flex-direction: row;
    }
  }
`;

const Heading = styled.h2`
  margin: 30px 0 30px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

const Text = styled.p`
  line-height: 25px;
  width: 100%;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
`;

const SubHeading = styled.h3`
  margin: 40px 0 20px;
`;

const OfferList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  &::before {
    content: '';
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.primary};
    ${mq.min.tablet_big} {
      display: block;
    }
  }
  ${mq.min.tablet_big} {
    padding-left: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Description = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  line-height: 20px;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/offer/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/offer/" } } }
    ) {
      ...OFFER_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
