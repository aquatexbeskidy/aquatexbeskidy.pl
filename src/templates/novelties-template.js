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
            <Card key={node.frontmatter.slug}>
              {node.frontmatter.image && (
                <GatsbyImage
                  image={getImage(node.frontmatter.image)}
                  alt={node.frontmatter.title}
                />
              )}
              <Box>
                <Header>{node.frontmatter.title}</Header>
                <Content>
                  {node.excerpt}
                  <FBLink href={node.frontmatter.url} target="_blank">
                    Czytaj więcej na fb!
                  </FBLink>
                  {node.frontmatter.showDate && <PublishDate>{node.frontmatter.date}</PublishDate>}
                </Content>
              </Box>
            </Card>
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
`;

const Heading = styled.h2`
  margin: 30px 0 30px;
  line-height: 28px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

const PublishDate = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 40px;
  ${mq.min.tablet_big} {
    flex-direction: row;
  }
  &:first-child {
    margin-top: 0;
  }
`;

const Header = styled.h3`
  width: 100%;
  max-width: 530px;
  margin-right: auto;
  margin: 10px 0 20px;
  line-height: 25px;
  ${mq.min.tablet_base} {
    margin-bottom: 30px;
  }
`;

const Box = styled.div`
  padding: 10px 0 0;
  ${mq.min.tablet_big} {
    padding-left: 30px;
  }
`;

const Content = styled.p`
  width: 100%;
  max-width: 530px;
  margin-right: auto;
  line-height: 25px;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
`;

const FBLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  display: block;
  margin: 10px 0 20px;
`;

const NoveltiesPaginationLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-right: 10px;
`;

const NoveltiesPaginationInfo = styled.span`
  display: block;
  margin-top: 15px;
`;

const NoveltiesPagination = styled.div`
  margin-top: 50px;
  font-size: ${({ theme }) => theme.font.size.lg};
  a {
    &:nth-child(2) {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 0;
        left: -6px;
        width: 1px;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "novelties" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            url
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 450, height: 350)
              }
            }
            showDate
            date(formatString: "DD-MM-YYYY")
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
