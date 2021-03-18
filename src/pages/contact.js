// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { graphql } from 'gatsby';
import React from 'react';

import { RootContainer } from '~containers';
import { QuickContact } from '~containers/FooterContainer';
import { MapLeaflet, Link } from '~components';
import { mq } from '~theme';

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
    <ContactWrapper>
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
    </ContactWrapper>
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
  .leaflet-container {
    ${mq.max.tablet_base} {
      height: 350px !important;
    }
  }
  .leaflet-popup-content {
    p {
      margin: 10px 0 0;
    }
  }
`;

const Details = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
`;

const Headline = styled.h2`
  margin: 30px 0 35px;
  ${mq.min.tablet_base} {
    margin-bottom: 50px;
  }
`;

const Description = styled.p`
  line-height: 25px;
  max-width: 450px;
  width: 100%;
  ${mq.min.tablet_base} {
    line-height: 30px;
  }
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
      padding-left: 0;
      justify-content: flex-start;
      text-align: left;
      color: ${({ theme }) => theme.color.primary};
      pointer-events: none;
      img {
        max-height: 35px;
        width: 35px;
      }
    }
    &:not(:first-child) {
      max-width: 190px;
      padding-left: 15px;
      padding-right: 20px;
      img {
        max-height: 14px;
        width: 14px;
        ${mq.min.tablet_base} {
          max-height: 16px;
          width: 16px;
        }
        ${mq.min.desktop_small} {
          max-height: 18px;
          width: 18px;
        }
      }
    }
  }
`;

const Image = styled.img`
  display: inline-block;
  max-height: 16px;
  margin-right: 6px;
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
