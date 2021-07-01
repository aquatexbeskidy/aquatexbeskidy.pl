// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import { Pagination, Link } from 'gatsby-plugin-advanced-pages';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { RootContainer } from '~containers';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { mq } from '~theme';
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const NoveltiesTemplate = ({ data }) => {
  const { hasPreviousPage, hasNextPage, currentPage, pageCount } = data.novelties.pageInfo;

  const nextLinkProps = {
    scope: 'pagination',
    to: 'novelties',
    params: {
      page: currentPage + 1,
    },
  };

  const prevLinkProps = {
    scope: currentPage !== 2 ? 'pagination' : '',
    params:
      currentPage !== 2
        ? {
            page: currentPage - 1,
          }
        : null,
    to: 'novelties',
  };

  return (
    <RootContainer meta={data.meta.frontmatter.meta}>
      <NoveltiesWrapper>
        <Heading>{data.page.title}</Heading>

        <div>
          {data.novelties.edges.map(({ node }) => (
            <div key={node.frontmatter.slug}>
              <h2>{node.frontmatter.title}</h2>
              {node.frontmatter.image && (
                <GatsbyImage
                  image={getImage(node.frontmatter.image)}
                  alt={node.frontmatter.title}
                />
              )}
              <p>{node.excerpt}</p>
            </div>
          ))}
        </div>

        {/* <Pagination route="novelties" pageInfo={data.novelties.pageInfo} ui="simple" /> */}

        <NoveltiesPagination>
          {hasPreviousPage && <NoveltiesPaginationLink {...prevLinkProps} children="Poprzednia" />}
          {hasNextPage && <NoveltiesPaginationLink {...nextLinkProps} children="Następna" />}

          <NoveltiesPaginationInfo>
            strona {currentPage} z {pageCount}
          </NoveltiesPaginationInfo>
        </NoveltiesPagination>
      </NoveltiesWrapper>
    </RootContainer>
  );
};

export default NoveltiesTemplate;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const NoveltiesWrapper = styled.div`
  margin: 0 auto 50px;
  max-width: 1200px;
  padding: 0 20px;
  width: 100%;

  > div {
    /* ${mq.min.mobile_big} {} */
  }
`;

const Heading = styled.h2`
  /* ${mq.min.tablet_base} {} */
`;

const NoveltiesPaginationLink = styled(Link)``;

const NoveltiesPaginationInfo = styled.span``;

const NoveltiesPagination = styled.div``;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  query Blog($id: String!, $limit: Int!, $offset: Int!) {
    page(id: { eq: $id }) {
      title
    }
    meta: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }
    novelties: allMdx(
      limit: $limit
      skip: $offset
      filter: { frontmatter: { type: { eq: "novelties" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            image {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 600)
              }
            }
          }
          excerpt(pruneLength: 200)
        }
      }
      pageInfo {
        ...Pagination
      }
    }
  }
`;
