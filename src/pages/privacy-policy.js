// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

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
      // frontmatter: {
      //   borehole: { mainTitle, mainContent, equipmentImgList, subContent },
      // },
      body,
    },
  },
}) => {
  const mainContentChildren = body
    ? { dangerouslySetInnerHTML: { __html: body } }
    : { children: body };

  // const subContentChildren = stringIncludesHTML(subContent)
  //   ? { dangerouslySetInnerHTML: { __html: subContent } }
  //   : { children: subContent };

  return (
    <RootContainer meta={meta}>
      <p {...mainContentChildren} />
      <p>{body}</p>
      {/* {mainContentChildren} */}
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

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/privacy-policy/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/privacy-policy/" } } }
    ) {
      ...PRIVACYPOLICY_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
