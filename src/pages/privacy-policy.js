// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';
import { Reviews } from '~components';
import { Review, Wrapper } from '~components/Reviews';
import { mq } from '~theme';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const PrivacyPolicyPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: {
        borehole: { mainTitle, mainContent, equipmentImgList, subContent },
      },
    },
  },
}) => {
  const mainContentChildren = stringIncludesHTML(mainContent)
    ? { dangerouslySetInnerHTML: { __html: mainContent } }
    : { children: mainContent };

  const subContentChildren = stringIncludesHTML(subContent)
    ? { dangerouslySetInnerHTML: { __html: subContent } }
    : { children: subContent };

  return (
    <RootContainer meta={meta}>
      asdsadsadada
      {/* <BoreholeWrapper>
        <Heading>{mainTitle}</Heading>
        <Description {...mainContentChildren} />
        <Reviews reviews={equipmentImgList} />
        <Description {...subContentChildren} />
      </BoreholeWrapper> */}
    </RootContainer>
  );
};

export default PrivacyPolicyPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const BoreholeWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
  ${Wrapper} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
  }
  ${Review} {
    flex-basis: 50%;
    display: flex;
    padding: 0;
  }
`;

const Heading = styled.h2`
  margin: 30px 0 30px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

const Description = styled.p`
  line-height: 25px;
  width: 100%;
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
      frontmatter: { meta: { permalink: { eq: "/borehole/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/borehole/" } } }
    ) {
      ...BOREHOLE_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
