// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { QuickContact } from '~containers/FooterContainer';
import { MapLeaflet, Link } from '~components';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────────────────────

const ContactPage = ({
  data: {
    page: {
      frontmatter: { meta },
    },
    content: {
      frontmatter: { contact },
    },
  },
}) => (
  <RootContainer meta={meta}>
    <Wrapper>
      <Details>
        <Headline>{contact.title}</Headline>
        <Description>{contact.subTitle}</Description>

        {contact.buttons && (
          <Buttons>
            {contact.buttons.map(({ text, url, type, icon }, index) => (
              <Link to={url} look={type} key={index}>
                <Image src={require(`../${icon}`)} />
                {text}
              </Link>
            ))}
          </Buttons>
        )}
      </Details>

      {typeof window !== 'undefined' && (
        <MapLeaflet
          title={contact.pinTitle}
          address={contact.pinDesc}
          height="500px"
          width="100%"
        />
      )}
    </Wrapper>
  </RootContainer>
);

export default ContactPage;

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

const ContactWrapper = styled.div`
  margin-bottom: 50px;
  & + ${QuickContact} {
    display: none;
  }
`;

const Wrapper = styled.div`
  .leaflet-popup-content {
    p {
      margin: 10px 0 0;
    }
  }
`;

const Details = styled.div`
  margin-bottom: 50px;
`;

const Headline = styled.h2`
  margin: 30px 0 50px;
`;

const Description = styled.p`
  line-height: 30px;
  max-width: 450px;
  width: 100%;
`;

const Buttons = styled.div`
  flex-direction: column;
  max-width: 250px;
  display: flex;

  a {
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
    text-align: right;
    margin-top: 15px;
    display: flex;

    font-weight: ${({ theme }) => theme.font.weight.semibold};

    &:first-child {
      color: ${({ theme }) => theme.color.primary};
      pointer-events: none;
    }
  }
`;

const Image = styled.img`
  display: inline-block;
  max-height: 16px;
  margin: 0 6px;
  width: 16px;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Graphql Query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  {
    page: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/contact/" } } }
    ) {
      frontmatter {
        ...META_FRAGMENT
      }
    }

    content: mdx(
      fileAbsolutePath: { regex: "/markdown/pages/" }
      frontmatter: { meta: { permalink: { eq: "/contact/" } } }
    ) {
      ...CONTACT_FRAGMENT
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────
