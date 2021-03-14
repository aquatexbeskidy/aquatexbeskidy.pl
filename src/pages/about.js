// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';
import React from 'react';

import { stringIncludesHTML } from '~utils';
import { RootContainer } from '~containers';

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
    <div>
      <h2>{mainTitle}</h2>
      <section>
        {contentBlocks.map(({ title, contentList }) => (
          <div key={title}>
            {contentList.map(({ desc }, index) => (
              <div key={index}>
                <p dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        ))}
      </section>
      <section>
        <h3>{subTitle}</h3>
        <ul>
          {whyUsList.map(({ title, desc }) => (
            <li key={title}>
              <h4>{title}</h4>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </RootContainer>
);

export default AboutPage;

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
