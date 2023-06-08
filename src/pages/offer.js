// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';
import { Reviews, Link } from '~components';
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
        offer: {
          mainTitle,
          mainContent,
          subContent,
          subTitle,
          bonusInfo,
          bonusInfoStrong,
          quickOfferTitle,
          quickOfferList,
          link,
          offerList,
          reviewImgList,
        },
      },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <OfferWrapper>
      <Heading>{mainTitle}</Heading>
      <Text>{mainContent}</Text>
      <Text>{subContent}</Text>
      <StrongInfo>{bonusInfo}</StrongInfo>
      <StrongInfoContent>{bonusInfoStrong}</StrongInfoContent>
      <QuickOfferWrapper>
        <Heading>{quickOfferTitle}</Heading>
        <QuickOfferList>
          {quickOfferList.map(({ title, icon, desc }, index) => {
            const descChildren = stringIncludesHTML(desc)
              ? { dangerouslySetInnerHTML: { __html: desc } }
              : { children: desc };
            return (
              <QuickItem key={index}>
                {icon && icon.includes('/icons/') && (
                  <Image alt={title} src={require(`../${icon}`)} />
                )}
                <div>
                  <SubSmallHeading>{title}</SubSmallHeading>
                  <Text {...descChildren} />
                </div>
              </QuickItem>
            );
          })}
          {link.map(({ text, url, type }) => {
            return (
              <Link to={url} look={type} key={text}>
                {text}
              </Link>
            );
          })}
        </QuickOfferList>
      </QuickOfferWrapper>
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
      &:not(:last-child) {
        margin-bottom: 15px;
        ${mq.min.mobile_big} {
          margin-bottom: 0;
        }
      }
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
  strong {
    font-weight: ${({ theme }) => theme.font.weight.normal};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const QuickOfferWrapper = styled.div`
  padding-top: 10px;
  ${mq.min.tablet_base} {
    padding-top: 20px;
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

const QuickOfferList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

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

const QuickItem = styled.li`
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

const StrongInfo = styled.strong`
  margin-right: 5px;
  line-height: 25px;
  width: 100%;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
`;

const StrongInfoContent = styled.strong`
  line-height: 25px;
  width: 100%;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
  color: ${({ theme }) => theme.color.primary};
`;

const SubHeading = styled.h3`
  margin: 70px 0 20px;
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
