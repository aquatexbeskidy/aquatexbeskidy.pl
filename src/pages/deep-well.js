// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import styled from 'styled-components';
import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';
import { Reviews } from '~components';
import { Review, Description, Content, List, Item } from '~components/Reviews';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const DeepWellPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        deepWell: {
          mainTitle,
          mainContent,
          additionList,
          waterSearchTitle,
          waterSearchDesc,
          waterConnectTitle,
          waterConnectDesc,
        },
      },
    },
  },
}) => {
  const mainContentChildren = stringIncludesHTML(mainContent)
    ? { dangerouslySetInnerHTML: { __html: mainContent } }
    : { children: mainContent };

  const waterSearchDescChildren = stringIncludesHTML(waterSearchDesc)
    ? { dangerouslySetInnerHTML: { __html: waterSearchDesc } }
    : { children: waterSearchDesc };

  const waterConnectDescChildren = stringIncludesHTML(waterConnectDesc)
    ? { dangerouslySetInnerHTML: { __html: waterConnectDesc } }
    : { children: waterConnectDesc };

  return (
    <RootContainer meta={meta}>
      <DeepWellWrapper>
        <Heading>{mainTitle}</Heading>
        <Text {...mainContentChildren} />
        <Reviews reviews={additionList} />
        <SubHeading>{waterSearchTitle}</SubHeading>
        <Text {...waterSearchDescChildren} />
        <SubHeading>{waterConnectTitle}</SubHeading>
        <Text {...waterConnectDescChildren} />
      </DeepWellWrapper>
    </RootContainer>
  );
};

export default DeepWellPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const DeepWellWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  ${Review} {
    padding: 0;
    text-align: left;
    flex-direction: column;
    align-items: flex-start;
    ${mq.min.tablet_big} {
      flex-direction: row;
      align-items: flex-start;
    }
    &:last-child {
      margin-top: 0;
      margin-left: 0;
      ${mq.min.tablet_big} {
        margin-top: 60px;
      }
    }
    &:nth-child(2n) {
      ${Content} {
        ${mq.min.desktop_small} {
          &:first-child {
            order: 0;
          }
        }
      }
    }
    ${Content} {
      order: 1;
      height: 100%;
      flex-basis: 50%;
      margin: 30px 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      ${Description} {
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 25px;
        margin-top: 0;
        padding: 0;
        text-align: left;
        margin: 0;
      }
      ${List} {
        list-style-type: none;
        margin: 0;
        padding: 0;
        ${Item} {
          width: 100%;
          max-width: 400px;
          padding: 10px 0;
          line-height: 25px;
        }
      }
      ${mq.min.tablet_big} {
        margin: 0;
        padding: 0 40px;
        align-items: center;
      }
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
  margin: 30px 0 30px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/deep-well/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/deep-well/" } } }
    ) {
      ...DEEPWELL_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
