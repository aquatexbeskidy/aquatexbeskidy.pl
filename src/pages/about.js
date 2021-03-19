// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';
import { Reviews } from '~components';
import { Wrapper, Review } from '~components/Reviews';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const AboutPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        about: { mainTitle, contentBlocks, viewOfWorkImgList, subTitle, whyUsList },
      },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <AboutWrapper>
      <Heading>{mainTitle}</Heading>
      <Section>
        {contentBlocks.map(({ title, contentList }) => (
          <Block key={title}>
            {contentList.map(({ desc }, index) => {
              const descChildren = stringIncludesHTML(desc)
                ? { dangerouslySetInnerHTML: { __html: desc } }
                : { children: desc };
              return (
                <Content key={index}>
                  <Text {...descChildren} />
                </Content>
              );
            })}
          </Block>
        ))}
      </Section>
      <Reviews reviews={viewOfWorkImgList} />
      <Section>
        <SubHeading>{subTitle}</SubHeading>
        <WhyUsList>
          {whyUsList.map(({ title, desc }) => (
            <Item key={title}>
              <Title>{title}</Title>
              <Description>{desc}</Description>
            </Item>
          ))}
        </WhyUsList>
      </Section>
    </AboutWrapper>
  </RootContainer>
);

export default AboutPage;

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

const AboutWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  ${Wrapper} {
    margin: 40px 0;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
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
    &::before {
      ${BorderLineStyles};
      top: 0;
    }
    &::after {
      ${BorderLineStyles};
      bottom: 0;
    }
    ${mq.min.mobile_big} {
      flex-direction: row;
    }
  }
`;

const Heading = styled.h2`
  margin: 30px 0 16px;
  ${mq.min.tablet_base} {
    margin-bottom: 34px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  &:last-child {
    justify-content: center;
    align-items: center;
  }
  ${mq.min.tablet_base} {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Block = styled.div`
  flex-basis: 50%;
  &:last-child {
    ${mq.min.tablet_base} {
      padding-left: 30px;
    }
  }
`;

const Text = styled.p`
  line-height: 25px;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
  strong {
    color: ${({ theme }) => theme.color.primary};
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      position: relative;
      padding-left: 25px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

const Content = styled.div``;

const SubHeading = styled.h3`
  flex-basis: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.xxl};
  margin: 40px 20px;
`;

const WhyUsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;
  ${mq.min.tablet_base} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Item = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  ${mq.min.tablet_base} {
    margin: 15px;
  }
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.font.size.xl};
`;

const Description = styled.p`
  text-align: center;
  line-height: 25px;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/about/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/about/" } } }
    ) {
      ...ABOUT_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
